import React, { useState, useEffect } from "react";
import 'react-quill/dist/quill.snow.css'; // Importa os estilos do Quill
import ReactQuill from 'react-quill';
import parse from 'html-react-parser'; // Importa a biblioteca para parsear HTML

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Plus,
  Trash2,
  ExternalLink,
  X,
  Upload,
  Image as ImageIcon,
  User,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/context/AuthContext";

interface ContentBlock {
  id: string;
  type: "text" | "image";
  content: string; // For text blocks, this is the text. For image blocks, this is the image URL
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

interface Company {
  id: string;
  name: string;
  period: string;
  description: string;
  projects: Project[];
}

interface ProjectShowcaseProps {
  companies?: Company[];
}

const defaultCompanies: Company[] = [];

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
  companies = defaultCompanies,
}) => {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [companiesList, setCompaniesList] = useState<Company[]>(companies);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(
    null,
  );
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    description: "",
    contentBlocks: [] as ContentBlock[],
    role: "",
    duration: "",
    achievements: [] as string[],
  });
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [currentTextBlock, setCurrentTextBlock] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

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

  useEffect(() => {
    // Certifica-se de que o Quill use o manipulador de imagem customizado
    const quill = (ReactQuill as any).quill;
    if (quill) {
      quill.getModule('toolbar').addHandler('image', imageHandler);
    }
  }, []);

  // Efeito para carregar projetos do Supabase na montagem do componente
  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase.from('projects').select('*');

      if (error) {
        console.error("Erro ao carregar projetos do Supabase:", error);
        return;
      }

      if (data) {
        // Agrupar projetos em uma empresa padrão ou em empresas existentes
        // Para simplificar, vou colocar todos os projetos em uma única empresa 'Meus Projetos'
        const companyId = "my-projects-company";
        const myProjectsCompany: Company = {
          id: companyId,
          name: "Meus Projetos",
          period: "",
          description: "",
          projects: data as Project[],
        };
        setCompaniesList([myProjectsCompany]);
      }
    };
    fetchProjects();
  }, []);

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  const openModal = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCompanyId(null);
    setNewProjectData({
      title: "",
      description: "",
      contentBlocks: [],
      role: "",
      duration: "",
      achievements: [],
    });
    setCurrentAchievement("");
    setCurrentTextBlock("");
  };

  const addAchievement = () => {
    if (currentAchievement.trim()) {
      setNewProjectData((prev) => ({
        ...prev,
        achievements: [...prev.achievements, currentAchievement.trim()],
      }));
      setCurrentAchievement("");
    }
  };

  const removeAchievement = (index: number) => {
    setNewProjectData((prev) => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index),
    }));
  };

  const addTextBlock = () => {
    if (currentTextBlock.trim()) {
      const newBlock: ContentBlock = {
        id: `block-\${Date.now()}`,
        type: "text",
        content: currentTextBlock.trim(),
      };
      setNewProjectData((prev) => ({
        ...prev,
        contentBlocks: [...prev.contentBlocks, newBlock],
      }));
      setCurrentTextBlock("");
    }
  };

  const addImageBlock = (imageUrl: string) => {
    if (imageUrl.trim()) {
      const newBlock: ContentBlock = {
        id: `block-\${Date.now()}`,
        type: "image",
        content: imageUrl.trim(),
      };
      setNewProjectData((prev) => ({
        ...prev,
        contentBlocks: [...prev.contentBlocks, newBlock],
      }));
    }
  };

  const removeContentBlock = (blockId: string) => {
    setNewProjectData((prev) => ({
      ...prev,
      contentBlocks: prev.contentBlocks.filter((block) => block.id !== blockId),
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        addImageBlock(imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProject = async () => {
    if (!selectedCompanyId || !newProjectData.title.trim()) return;

    const newProject: Omit<Project, 'id'> = {
      title: newProjectData.title,
      description: newProjectData.description,
      contentBlocks:
        newProjectData.contentBlocks.length > 0
          ? newProjectData.contentBlocks
          : [],
      role: newProjectData.role,
      duration: newProjectData.duration,
      achievements:
        newProjectData.achievements.length > 0
          ? newProjectData.achievements
          : [],
    };

    const { data, error } = await supabase.from('projects').insert([newProject]).select();

    if (error) {
      console.error("Erro ao salvar o projeto no Supabase:", error);
      alert("Erro ao salvar o projeto. Por favor, tente novamente.");
      return;
    }

    const savedProject = data[0]; // O Supabase retorna um array com o item inserido

    setCompaniesList((prev) =>
      prev.map((company) =>
        company.id === selectedCompanyId
          ? { ...company, projects: [...company.projects, savedProject] }
          : company,
      ),
    );

    closeModal();
  };

  const deleteProject = async (companyId: string, projectId: string) => {
    // Deletar do Supabase
    const { error } = await supabase.from('projects').delete().eq('id', projectId);

    if (error) {
      console.error("Erro ao deletar o projeto do Supabase:", error);
      alert("Erro ao deletar o projeto. Por favor, tente novamente.");
      return;
    }

    // Atualizar o estado local
    setCompaniesList((prev) =>
      prev.map((company) =>
        company.id === companyId
          ? {
              ...company,
              projects: company.projects.filter((p) => p.id !== projectId),
            }
          : company,
      ),
    );
  };

  return (
    <section className="w-full py-12 bg-background" id="projects">
      <div className="container mx-auto px-4">
        {user && (
          <div className="flex justify-center mb-6">
            <Button
              onClick={() => {
                // Se não houver empresas, adicione uma empresa padrão temporária
                if (companiesList.length === 0) {
                  const newCompanyId = `company-${Date.now()}`;
                  setCompaniesList([
                    {
                      id: newCompanyId,
                      name: "Meus Projetos",
                      period: "",
                      description: "",
                      projects: [],
                    },
                  ]);
                  setSelectedCompanyId(newCompanyId);
                } else {
                  setSelectedCompanyId(companiesList[0].id); // Seleciona a primeira empresa existente
                }
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Adicionar Projeto
            </Button>
          </div>
        )}

        <div className="space-y-12">
          {companiesList.length === 0 ? (
            <p className="text-center text-muted-foreground">Nenhum projeto adicionado ainda. Clique em "Adicionar Projeto" para começar!</p>
          ) : (
            companiesList.map((company) => (
              <div key={company.id} className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2">
                    <h3 className="text-2xl font-bold">{company.name}</h3>
                    <span className="text-muted-foreground text-lg">
                      {company.period}
                    </span>
                  </div>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    {company.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {company.projects.map((project) => {
                    return (
                      <Card
                        key={project.id}
                        className="overflow-hidden h-full flex flex-col"
                      >
                        <CardHeader>
                          <CardTitle>{project.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div
                            className="text-sm text-muted-foreground line-clamp-6"
                            dangerouslySetInnerHTML={{ __html: project.description }}
                          />
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4 text-sm">
                            <div className="flex items-center gap-1">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{project.role}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{project.duration}</span>
                            </div>
                          </div>

                          {expandedProject === project.id && (
                            <div className="mt-4 space-y-2">
                              <h4 className="font-semibold text-sm mb-2">Principais Resultados</h4>
                              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                                {project.achievements?.map(
                                  (achievement, index) => (
                                    <li key={index}>{achievement}</li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}
                        </CardContent>
                        <CardFooter className="flex justify-end border-t bg-muted/20 pt-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteProject(company.id, project.id!)}
                            className="text-xs flex items-center gap-1 mr-2"
                          >
                            <Trash2 className="h-3 w-3" />
                            Deletar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/project/${project.id}`)}
                            className="text-xs flex items-center gap-1"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Ver Detalhes
                          </Button>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Modal for adding new project */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Projeto</DialogTitle>
              <DialogDescription>
                Preencha os dados do novo projeto para a empresa selecionada.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título do Projeto *</Label>
                <Input
                  id="title"
                  value={newProjectData.title}
                  onChange={(e) =>
                    setNewProjectData((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Ex: Sistema de CRM Empresarial"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <ReactQuill
                  theme="snow"
                  value={newProjectData.description}
                  onChange={(content) =>
                    setNewProjectData((prev) => ({ ...prev, description: content }))
                  }
                  placeholder="Uma breve descrição do projeto..."
                  className="min-h-[100px]"
                  modules={quillModules}
                  formats={quillFormats}
                />
              </div>

              {/* Content Blocks (Detailed Content) */}
              <div className="space-y-2">
                <Label>Conteúdo Detalhado (Texto e Imagens)</Label>
                {newProjectData.contentBlocks.length > 0 && (
                  <div className="space-y-2 mt-2">
                    {newProjectData.contentBlocks.map((block, index) => (
                      <div key={block.id || index} className="flex items-center justify-between bg-muted p-2 rounded text-sm">
                        {block.type === "text" ? (
                          <span>{block.content}</span>
                        ) : (
                          <img src={block.content} alt="Content preview" className="h-12 w-12 object-cover rounded" />
                        )}
                        <button
                          type="button"
                          onClick={() => removeContentBlock(block.id)}
                          className="text-muted-foreground hover:text-destructive flex-shrink-0"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <ReactQuill
                    theme="snow"
                    value={currentTextBlock}
                    onChange={setCurrentTextBlock}
                    placeholder="Adicione um bloco de texto..."
                    className="flex-grow"
                    modules={quillModules}
                    formats={quillFormats}
                  />
                  <Button
                    type="button"
                    size="sm"
                    className="self-start"
                    onClick={addTextBlock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {/* Achievements (Principais Resultados) */}
              <div className="space-y-2">
                <Label>Principais Resultados</Label>
                {newProjectData.achievements.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {newProjectData.achievements.map((achievement, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded text-sm">
                        <span>{achievement}</span>
                        <button
                          type="button"
                          onClick={() => removeAchievement(index)}
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
                    value={currentAchievement}
                    onChange={(e) => setCurrentAchievement(e.target.value)}
                  />
                  <Button type="button" size="sm" onClick={addAchievement}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Role and Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role">Sua Função</Label>
                  <Input
                    id="role"
                    value={newProjectData.role}
                    onChange={(e) =>
                      setNewProjectData((prev) => ({
                        ...prev,
                        role: e.target.value,
                      }))
                    }
                    placeholder="Ex: Tech Lead, Desenvolvedor"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duração</Label>
                  <Input
                    id="duration"
                    value={newProjectData.duration}
                    onChange={(e) =>
                      setNewProjectData((prev) => ({
                        ...prev,
                        duration: e.target.value,
                      }))
                    }
                    placeholder="Ex: 6 meses, 1 ano"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={closeModal}>
                Cancelar
              </Button>
              <Button
                onClick={saveProject}
                disabled={!newProjectData.title.trim()}
              >
                Salvar Projeto
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ProjectShowcase;
