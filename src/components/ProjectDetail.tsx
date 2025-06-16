import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock, X, Plus, Upload } from "lucide-react";
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
  content: string;
}

interface Project {
  id?: string;
  title: string;
  description: string;
  contentBlocks?: ContentBlock[];
  role: string;
  duration: string;
  achievements?: string[];
}

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [editProjectData, setEditProjectData] = useState<Omit<Project, 'id'> | null>(null);
  const { user } = useAuth();
  const [currentEditTextBlock, setCurrentEditTextBlock] = useState("");
  const [currentEditAchievement, setCurrentEditAchievement] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState("");

  const quillModules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image',
  ];

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file) {
        const filename = `${Date.now()}-${file.name}`;
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
        role: project.role,
        duration: project.duration,
        achievements: project.achievements || [],
      });
      setIsEditModalOpen(true);
    }
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditProjectData(null);
  };

  const openImageModal = (src: string) => {
    setCurrentImageSrc(src);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    setCurrentImageSrc("");
  };

  const handleUpdateProject = async () => {
    if (!id || !editProjectData || !editProjectData.title.trim()) return;

    const { error } = await supabase
      .from('projects')
      .update(editProjectData)
      .eq('id', id);

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

          <p
            className="text-xl text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: project.description }}
          ></p>

          {user && (
            <div className="flex justify-end mb-4">
              <Button onClick={openEditModal} className="flex items-center gap-2">
                Editar Projeto
              </Button>
            </div>
          )}
        </div>

        {/* Conteúdo Detalhado */}
        {project.contentBlocks && project.contentBlocks.length > 0 && (
          <div className="mt-12 space-y-8">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Conteúdo Detalhado</h2>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start"
              style={{ gridTemplateColumns: '1fr 1fr', gridAutoRows: 'minmax(min-content, max-content)' }}
            >
              {project.contentBlocks.map((block) => (
                <div key={block.id} className="md:col-span-1">
                  {block.type === "text" ? (
                    <div
                      className="text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  ) : (
                    <div className="mb-4">
                      <img
                        src={block.content}
                        alt="Content Image"
                        className="w-full h-auto max-w-full max-h-96 object-contain rounded-lg cursor-pointer"
                        onClick={() => openImageModal(block.content)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Principais Resultados */}
        {project.achievements && project.achievements.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Principais Resultados</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 leading-relaxed">
              {project.achievements.map((achievement, index) => (
                <li key={index}>{achievement}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* Edit Project Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Projeto</DialogTitle>
          </DialogHeader>

          {editProjectData && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">Título do Projeto *</Label>
                <Input
                  id="edit-title"
                  value={editProjectData.title}
                  onChange={(e) =>
                    setEditProjectData((prev) =>
                      prev ? { ...prev, title: e.target.value } : null,
                    )
                  }
                  placeholder="Título do Projeto"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-description">Descrição</Label>
                <ReactQuill
                  theme="snow"
                  value={editProjectData.description}
                  onChange={(content) =>
                    setEditProjectData((prev) =>
                      prev ? { ...prev, description: content } : null,
                    )
                  }
                  placeholder="Uma breve descrição do projeto..."
                  className="min-h-[100px]"
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role">Sua Função</Label>
                  <Input
                    id="edit-role"
                    value={editProjectData.role}
                    onChange={(e) =>
                      setEditProjectData((prev) =>
                        prev ? { ...prev, role: e.target.value } : null,
                      )
                    }
                    placeholder="Ex: Tech Lead"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-duration">Duração</Label>
                  <Input
                    id="edit-duration"
                    value={editProjectData.duration}
                    onChange={(e) =>
                      setEditProjectData((prev) =>
                        prev ? { ...prev, duration: e.target.value } : null,
                      )
                    }
                    placeholder="Ex: 6 meses"
                  />
                </div>
              </div>

              {/* Content Blocks (similar logic as ProjectShowcase for adding/removing) */}
              <div className="space-y-2">
                <Label>Conteúdo Detalhado (Texto e Imagens)</Label>
                {editProjectData.contentBlocks && editProjectData.contentBlocks.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {editProjectData.contentBlocks.map((block, index) => (
                      <div key={block.id || index} className="flex items-center justify-between bg-muted p-2 rounded text-sm">
                        {block.type === "text" ? (
                          <span dangerouslySetInnerHTML={{ __html: block.content }}></span>
                        ) : (
                          <img src={block.content} alt="Content preview" className="h-12 w-12 object-cover rounded" />
                        )}
                        <button
                          type="button"
                          onClick={() => setEditProjectData(prev => prev ? { ...prev, contentBlocks: prev.contentBlocks?.filter(b => b.id !== block.id) } : null)}
                          className="text-muted-foreground hover:text-destructive flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {/* Add new text block input */}
                <div className="flex gap-2">
                  <ReactQuill
                    theme="snow"
                    value={currentEditTextBlock}
                    onChange={setCurrentEditTextBlock}
                    placeholder="Adicione um bloco de texto..."
                    className="flex-grow"
                    modules={quillModules}
                    formats={quillFormats}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="self-start"
                    onClick={() => {
                      if (currentEditTextBlock.trim() && currentEditTextBlock !== '<p><br></p>') { // Check for actual content
                        setEditProjectData(prev => prev ? { ...prev, contentBlocks: [...(prev.contentBlocks || []), { id: `block-${Date.now()}`, type: "text", content: currentEditTextBlock.trim() }] } : null);
                        setCurrentEditTextBlock(""); // Limpa o campo após adicionar
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Achievements */}
              <div className="space-y-2">
                <Label>Principais Resultados</Label>
                {editProjectData.achievements && editProjectData.achievements.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {editProjectData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded text-sm">
                        <span>{achievement}</span>
                        <button
                          type="button"
                          onClick={() => setEditProjectData(prev => prev ? { ...prev, achievements: prev.achievements?.filter((_, i) => i !== index) } : null)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <Input
                    placeholder="Adicione um resultado..."
                    value={currentEditAchievement}
                    onChange={(e) => setCurrentEditAchievement(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (currentEditAchievement.trim()) {
                        setEditProjectData(prev => prev ? { ...prev, achievements: [...(prev.achievements || []), currentEditAchievement.trim()] } : null);
                        setCurrentEditAchievement(""); // Limpa o campo após adicionar
                      }
                    }}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={closeEditModal}>Cancelar</Button>
            <Button onClick={handleUpdateProject} disabled={!editProjectData?.title.trim()}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Modal */}
      <Dialog open={showImageModal} onOpenChange={setShowImageModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] p-0 flex items-center justify-center">
          {currentImageSrc && (
            <img src={currentImageSrc} alt="Visualização da imagem" className="max-w-full max-h-full object-contain" />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProjectDetail;
