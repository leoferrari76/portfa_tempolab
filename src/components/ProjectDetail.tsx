import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock, X, Plus, Upload, Trash2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Importa os estilos do Quill
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";

interface ContentBlock {
  id: string;
  type: "text" | "image";
  content: string; // Para blocos de texto, este é o texto. Para blocos de imagem, esta é a URL da imagem
  caption?: string; // Legenda opcional para imagens
}

interface Project {
  id?: string;
  title: string;
  description: string;
  contentBlocks?: ContentBlock[]; // Usado para o conteúdo detalhado, incluindo texto e imagens
  detailedContent?: string; // Conteúdo principal em Rich Text, pode ser usado para uma introdução longa
  role: string;
  duration: string;
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editProjectData, setEditProjectData] = useState<
    Omit<Project, "id"> | null
  >(null);
  const { user } = useAuth();
  const [currentEditTextBlock, setCurrentEditTextBlock] = useState(""); // Novo estado para adicionar blocos de texto
  const [newImageBlockUrl, setNewImageBlockUrl] = useState(""); // Novo estado para a URL da imagem a ser adicionada
  const imageInputRef = React.useRef<HTMLInputElement>(null); // Referência para o input de arquivo de imagem
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
  ];

  const quillModulesForDetailedContent = { // Módulos para o detailedContent (permite imagens)
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormatsForDetailedContent = [ // Formatos para o detailedContent
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
  ];

  const imageHandler = () => {
    // Este imageHandler é para o Quill da descrição principal ou detailedContent
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        // Sanitize the filename to remove invalid characters for Supabase Storage
        const originalFilename = file.name;
        const sanitizedFilename = originalFilename
          .normalize("NFD") // Normalize Unicode characters
          .replace(/[^\w.-]/g, '') // Remove all non-word characters except hyphen and dot
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with a single hyphen
          .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens

        const filename = `${Date.now()}-${sanitizedFilename}`;
        const { data, error } = await supabase.storage
          .from('project-images') // Use o nome do seu bucket aqui
          .upload(filename, file);

        if (error) {
          console.error("Erro ao fazer upload da imagem:", error);
          alert("Erro ao fazer upload da imagem. Por favor, tente novamente.");
          return;
        }

        const { data: publicUrlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(data.path);

        const editor = (this as any).quill;
        const range = editor.getSelection();
        editor.insertEmbed(range.index, 'image', publicUrlData.publicUrl);
      }
    };
  };

  const fetchProject = async () => {
    setLoading(true);
    if (!id) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error("Erro ao carregar o projeto:", error);
      setLoading(false);
      return;
    }

    if (data) {
      console.log("Dados do projeto carregados no ProjectDetail:", data);
      setProject(data as Project);
      setEditProjectData(data as Omit<Project, 'id'>); // Preenche os dados para edição
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProject();
    // Certifica-se de que o Quill use o manipulador de imagem customizado
    const quill = (ReactQuill as any).quill;
    if (quill) {
      quill.getModule('toolbar').addHandler('image', imageHandler);
    }
  }, [id]);

  const openEditModal = () => {
    if (project) {
      setEditProjectData({
        title: project.title,
        description: project.description,
        contentBlocks: project.contentBlocks || [],
        detailedContent: project.detailedContent || "", // Inclui detailedContent
        role: project.role,
        duration: project.duration,
      });
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProjectData(null);
    setCurrentEditTextBlock("");
    setNewImageBlockUrl("");
  };

  const openImageModal = (src: string) => {
    setCurrentImageSrc(src);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setCurrentImageSrc("");
  };

  const addTextBlockToContentBlocks = () => {
    if (currentEditTextBlock.trim() && editProjectData) {
      const newBlock: ContentBlock = {
        id: `block-${Date.now()}`,
        type: "text",
        content: currentEditTextBlock.trim(),
      };
      setEditProjectData((prev) => ({
        ...(prev as Omit<Project, "id">),
        contentBlocks: [...(prev?.contentBlocks || []), newBlock],
      }));
      setCurrentEditTextBlock("");
    }
  };

  const handleImageUploadForContentBlocks = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const originalFilename = file.name;
      const sanitizedFilename = originalFilename
        .normalize("NFD")
        .replace(/[^\w.-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      const filename = `${Date.now()}-${sanitizedFilename}`;
      const { data, error } = await supabase.storage
        .from('project-images')
        .upload(filename, file);

      if (error) {
        console.error("Erro ao fazer upload da imagem para o Supabase:", error);
        alert("Erro ao fazer upload da imagem. Por favor, tente novamente.");
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from('project-images')
        .getPublicUrl(data.path);

      if (editProjectData) {
        const newBlock: ContentBlock = {
          id: `block-${Date.now()}`,
          type: "image",
          content: publicUrlData.publicUrl,
        };
        setEditProjectData((prev) => ({
          ...(prev as Omit<Project, "id">),
          contentBlocks: [...(prev?.contentBlocks || []), newBlock],
        }));
      }
    }
  };

  const removeContentBlock = (blockId: string) => {
    if (editProjectData) {
      setEditProjectData((prev) => ({
        ...(prev as Omit<Project, "id">),
        contentBlocks: prev?.contentBlocks?.filter((block) => block.id !== blockId) || [],
      }));
    }
  };

  const handleUpdateProject = async () => {
    if (!id || !editProjectData || !editProjectData.title.trim()) return;

    const projectToUpdate = {
      title: editProjectData.title,
      description: editProjectData.description,
      contentBlocks: editProjectData.contentBlocks,
      detailedContent: editProjectData.detailedContent,
      role: editProjectData.role,
      duration: editProjectData.duration,
    };

    const { error } = await supabase
      .from("projects")
      .update(projectToUpdate)
      .eq("id", id);

    if (error) {
      console.error("Erro ao atualizar o projeto:", error);
      alert("Erro ao atualizar o projeto. Por favor, tente novamente.");
      return;
    }

    alert("Projeto atualizado com sucesso!");
    closeEditModal();
    fetchProject(); // Recarrega os dados para exibir as alterações
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Carregando projeto...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Projeto não encontrado</h1>
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Início
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                LF
              </span>
            </div>
            <span className="text-lg font-bold">Leonardo Ferrari</span>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {project.title}
              </h1>
            </div>
            <div className="flex flex-col gap-2 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                {project.role}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {project.duration}
              </div>
            </div>
          </div>

          <div
            className="prose max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: project.description }}
          />

          {/* Detailed Content Section (Behance-like) */}
          <section className="space-y-8 mt-12">
            {project.detailedContent && (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold mb-4">Visão Geral do Projeto</h2>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: project.detailedContent }}
                />
              </div>
            )}

            {project.contentBlocks && project.contentBlocks.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Coluna de textos */}
                <div className="space-y-6 md:col-span-2">
                  {project.contentBlocks.filter(b => b.type === 'text').map(block => (
                    <div key={block.id} className="prose max-w-none pr-4 bg-card rounded-lg shadow-sm border">
                      <div dangerouslySetInnerHTML={{ __html: block.content }} />
                    </div>
                  ))}
                </div>
                {/* Coluna de imagens */}
                <div className="space-y-6 md:col-span-1 flex flex-col items-center">
                  {project.contentBlocks.filter(b => b.type === 'image').map(block => (
                    <img
                      key={block.id}
                      src={block.content}
                      alt={block.caption || 'Imagem do Projeto'}
                      className="rounded-lg shadow-md object-cover w-full max-w-xs max-h-60 cursor-pointer mb-4 self-start"
                      onClick={() => openImageModal(block.content)}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>

        {user && (
          <div className="flex justify-center mt-8">
            <Button onClick={openEditModal} className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Editar Projeto
            </Button>
          </div>
        )}
      </main>

      {/* Edit Project Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>
          {editProjectData && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título do Projeto *</Label>
                <Input
                  id="edit-title"
                  value={editProjectData.title}
                  onChange={(e) =>
                    setEditProjectData((prev) => ({
                      ...(prev as Omit<Project, "id">),
                      title: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição Breve</Label>
                <ReactQuill
                  theme="snow"
                  value={editProjectData.description}
                  onChange={(content) =>
                    setEditProjectData((prev) => ({
                      ...(prev as Omit<Project, "id">),
                      description: content,
                    }))
                  }
                  modules={quillModules}
                  formats={quillFormats}
                  className="min-h-[100px]"
                />
              </div>

              {/* Detailed Content (Rich Text) */}
              <div className="space-y-2">
                <Label htmlFor="edit-detailed-content">
                  Conteúdo Detalhado do Projeto (Processo, Resultados, etc.)
                </Label>
                <ReactQuill
                  theme="snow"
                  value={editProjectData.detailedContent}
                  onChange={(content) =>
                    setEditProjectData((prev) => ({
                      ...(prev as Omit<Project, "id">),
                      detailedContent: content,
                    }))
                  }
                  modules={quillModulesForDetailedContent}
                  formats={quillFormatsForDetailedContent}
                  className="min-h-[200px]"
                />
              </div>

              {/* Content Blocks (Text and Images) */}
              <div className="space-y-4">
                <Label>Blocos de Conteúdo Adicionais (Imagens e Texto)</Label>
                <div className="space-y-3">
                  {editProjectData.contentBlocks?.map((block) => (
                    <div
                      key={block.id}
                      className="flex items-center justify-between bg-muted p-3 rounded-md"
                    >
                      {block.type === "text" ? (
                        <div
                          className="flex-grow pr-4"
                          dangerouslySetInnerHTML={{ __html: block.content }}
                        />
                      ) : (
                        <img
                          src={block.content}
                          alt={block.caption || "Imagem do bloco"}
                          className="h-16 w-16 object-cover rounded-md flex-shrink-0 mr-4"
                        />
                      )}
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => removeContentBlock(block.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                {/* Adicionar Novo Bloco de Texto */}
                <div className="space-y-2 border-t pt-4">
                  <Label htmlFor="new-text-block">Adicionar Novo Bloco de Texto</Label>
                  <Textarea
                    id="new-text-block"
                    placeholder="Adicione um parágrafo, etapa do processo, etc."
                    value={currentEditTextBlock}
                    onChange={(e) => setCurrentEditTextBlock(e.target.value)}
                    rows={3}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={addTextBlockToContentBlocks}
                    disabled={!currentEditTextBlock.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Adicionar Texto
                  </Button>
                </div>

                {/* Adicionar Nova Imagem */}
                <div className="space-y-2 border-t pt-4">
                  <Label htmlFor="new-image-block">Adicionar Nova Imagem</Label>
                  <Input
                    id="image-upload-content-block"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUploadForContentBlocks}
                    className="hidden"
                    ref={imageInputRef}
                  />
                  <Button
                    variant="outline"
                    onClick={() => imageInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 inline-block mr-2" /> Carregar Imagem
                  </Button>
                </div>
              </div>

              {/* Role and Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Sua Função</Label>
                  <Input
                    id="edit-role"
                    value={editProjectData.role}
                    onChange={(e) =>
                      setEditProjectData((prev) => ({
                        ...(prev as Omit<Project, "id">),
                        role: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duração</Label>
                  <Input
                    id="edit-duration"
                    value={editProjectData.duration}
                    onChange={(e) =>
                      setEditProjectData((prev) => ({
                        ...(prev as Omit<Project, "id">),
                        duration: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={closeEditModal}>
              Cancelar
            </Button>
            <Button onClick={handleUpdateProject}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Zoom Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-4xl">
          <img src={currentImageSrc} alt="Zoomed Project Image" className="w-full h-auto" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
