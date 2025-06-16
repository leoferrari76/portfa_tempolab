import React, { useState } from "react";

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
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Technology {
  name: string;
  color?: "default" | "secondary" | "destructive" | "outline";
}

interface ContentBlock {
  id: string;
  type: "text" | "image";
  content: string; // For text blocks, this is the text. For image blocks, this is the image URL
}

interface Project {
  id: string;
  title: string;
  description: string;
  contentBlocks?: ContentBlock[];
  role: string;
  duration: string;
  technologies: Technology[];
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

const defaultCompanies: Company[] = [
  {
    id: "company-1",
    name: "Tech Innovations Consulting",
    period: "2020 - 2022",
    description:
      "Led multiple digital transformation projects for enterprise clients.",
    projects: [
      {
        id: "project-1-1",
        title: "Enterprise CRM Implementation",
        description:
          "Implemented a custom CRM solution for a Fortune 500 company.",
        role: "Technical Lead",
        duration: "8 months",
        technologies: [
          { name: "React", color: "default" },
          { name: "Node.js", color: "secondary" },
          { name: "MongoDB", color: "outline" },
        ],
        achievements: [
          "Reduced customer response time by 45%",
          "Integrated with 5 legacy systems",
          "Implemented automated reporting system",
        ],
      },
      {
        id: "project-1-2",
        title: "Supply Chain Optimization Platform",
        description:
          "Developed a supply chain analytics and optimization platform.",
        role: "Solution Architect",
        duration: "10 months",
        technologies: [
          { name: "Python", color: "default" },
          { name: "TensorFlow", color: "destructive" },
          { name: "AWS", color: "secondary" },
        ],
        achievements: [
          "Reduced inventory costs by 23%",
          "Improved delivery time accuracy by 34%",
          "Implemented predictive analytics for demand forecasting",
        ],
      },
    ],
  },
];

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
    technologies: [] as Technology[],
    achievements: [] as string[],
  });
  const [currentTech, setCurrentTech] = useState("");
  const [currentAchievement, setCurrentAchievement] = useState("");
  const [currentTextBlock, setCurrentTextBlock] = useState("");
  const navigate = useNavigate();

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
      technologies: [],
      achievements: [],
    });
    setCurrentTech("");
    setCurrentAchievement("");
    setCurrentTextBlock("");
  };

  const addTechnology = () => {
    if (currentTech.trim()) {
      setNewProjectData((prev) => ({
        ...prev,
        technologies: [
          ...prev.technologies,
          { name: currentTech.trim(), color: "default" },
        ],
      }));
      setCurrentTech("");
    }
  };

  const removeTechnology = (index: number) => {
    setNewProjectData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((_, i) => i !== index),
    }));
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
        id: `block-${Date.now()}`,
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
        id: `block-${Date.now()}`,
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

  const saveProject = () => {
    if (!selectedCompanyId || !newProjectData.title.trim()) return;

    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: newProjectData.title,
      description: newProjectData.description,
      contentBlocks:
        newProjectData.contentBlocks.length > 0
          ? newProjectData.contentBlocks
          : undefined,
      role: newProjectData.role,
      duration: newProjectData.duration,
      technologies: newProjectData.technologies,
      achievements:
        newProjectData.achievements.length > 0
          ? newProjectData.achievements
          : undefined,
    };

    setCompaniesList((prev) =>
      prev.map((company) =>
        company.id === selectedCompanyId
          ? { ...company, projects: [...company.projects, newProject] }
          : company,
      ),
    );

    closeModal();
  };

  const deleteProject = (companyId: string, projectId: string) => {
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
        <h2 className="text-3xl font-bold mb-8 text-center">
          Consulting Experience
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Throughout my career, I've had the opportunity to work with various
          consulting firms, helping clients solve complex technical challenges
          and implement innovative solutions.
        </p>

        <div className="space-y-12">
          {companiesList.map((company) => (
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

              <div className="flex justify-center mb-6">
                <Button
                  onClick={() => openModal(company.id)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Adicionar Projeto
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {company.projects.map((project) => (
                  <Card
                    key={project.id}
                    className="overflow-hidden border border-muted hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <span className="font-medium">{project.role}</span>
                        <span className="text-xs text-muted-foreground">
                          ({project.duration})
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="mb-4 text-sm">{project.description}</p>

                      {expandedProject === project.id &&
                        project.contentBlocks && (
                          <div className="mt-4 space-y-4">
                            <h4 className="font-medium mb-2 text-sm">
                              Conteúdo Detalhado:
                            </h4>
                            {project.contentBlocks.map((block) => (
                              <div key={block.id}>
                                {block.type === "text" ? (
                                  <p className="text-xs leading-relaxed">
                                    {block.content}
                                  </p>
                                ) : (
                                  <div className="flex justify-center">
                                    <img
                                      src={block.content}
                                      alt="Project content"
                                      className="max-w-full h-auto rounded-lg shadow-sm border"
                                      style={{ maxHeight: "200px" }}
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                      {expandedProject === project.id &&
                        project.achievements && (
                          <div className="mt-4">
                            <h4 className="font-medium mb-2 text-sm">
                              Key Achievements:
                            </h4>
                            <ul className="list-disc pl-4 space-y-1">
                              {project.achievements.map(
                                (achievement, index) => (
                                  <li key={index} className="text-xs">
                                    {achievement}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}

                      <div className="flex flex-wrap gap-1 mt-4">
                        {project.technologies.map((tech, index) => (
                          <Badge
                            key={index}
                            variant={tech.color}
                            className="text-xs"
                          >
                            {tech.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t bg-muted/20 pt-3">
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteProject(company.id, project.id)}
                          className="text-xs flex items-center gap-1 text-destructive hover:text-destructive p-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/project/${project.id}`)}
                          className="text-xs flex items-center gap-1 p-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleProjectExpansion(project.id)}
                        className="text-xs flex items-center gap-1"
                      >
                        {expandedProject === project.id ? "Menos" : "Mais"}
                        <ChevronRight
                          className={`h-3 w-3 transition-transform ${expandedProject === project.id ? "rotate-90" : ""}`}
                        />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
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
                <Textarea
                  id="description"
                  value={newProjectData.description}
                  onChange={(e) =>
                    setNewProjectData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Descreva o projeto e seus objetivos..."
                  rows={3}
                />
              </div>

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

              <div className="space-y-2">
                <Label>Tecnologias</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentTech}
                    onChange={(e) => setCurrentTech(e.target.value)}
                    placeholder="Ex: React, Node.js"
                    onKeyPress={(e) => e.key === "Enter" && addTechnology()}
                  />
                  <Button type="button" onClick={addTechnology} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newProjectData.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProjectData.technologies.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tech.name}
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Conteúdo Detalhado (Texto e Imagens)</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Textarea
                      value={currentTextBlock}
                      onChange={(e) => setCurrentTextBlock(e.target.value)}
                      placeholder="Adicione um bloco de texto..."
                      rows={3}
                    />
                    <Button
                      type="button"
                      onClick={addTextBlock}
                      size="sm"
                      className="self-start"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <Label
                      htmlFor="image-upload"
                      className="flex items-center gap-2 cursor-pointer bg-secondary hover:bg-secondary/80 px-3 py-2 rounded-md text-sm"
                    >
                      <Upload className="h-4 w-4" />
                      Adicionar Imagem
                    </Label>
                  </div>
                </div>

                {newProjectData.contentBlocks.length > 0 && (
                  <div className="space-y-2 mt-4 max-h-60 overflow-y-auto">
                    <h4 className="text-sm font-medium">Blocos de Conteúdo:</h4>
                    {newProjectData.contentBlocks.map((block, index) => (
                      <div
                        key={block.id}
                        className="flex items-start justify-between bg-muted p-3 rounded text-sm gap-2"
                      >
                        <div className="flex items-start gap-2 flex-1">
                          {block.type === "text" ? (
                            <div className="flex items-start gap-2">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded font-medium">
                                TEXTO
                              </span>
                              <p className="text-xs leading-relaxed flex-1">
                                {block.content}
                              </p>
                            </div>
                          ) : (
                            <div className="flex items-start gap-2">
                              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                                IMAGEM
                              </span>
                              <img
                                src={block.content}
                                alt={`Content block ${index + 1}`}
                                className="w-16 h-16 object-cover rounded border"
                              />
                            </div>
                          )}
                        </div>
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
              </div>

              <div className="space-y-2">
                <Label>Principais Resultados</Label>
                <div className="flex gap-2">
                  <Input
                    value={currentAchievement}
                    onChange={(e) => setCurrentAchievement(e.target.value)}
                    placeholder="Ex: Reduziu custos em 30%"
                    onKeyPress={(e) => e.key === "Enter" && addAchievement()}
                  />
                  <Button type="button" onClick={addAchievement} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                {newProjectData.achievements.length > 0 && (
                  <div className="space-y-1 mt-2">
                    {newProjectData.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-muted p-2 rounded text-sm"
                      >
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
