import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { ChevronRight, Plus, Trash2, ExternalLink, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Technology {
  name: string;
  color?: "default" | "secondary" | "destructive" | "outline";
}

interface Project {
  id: string;
  title: string;
  description: string;
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
  {
    id: "company-2",
    name: "Digital Solutions Group",
    period: "2018 - 2020",
    description:
      "Specialized in digital transformation and custom software development.",
    projects: [
      {
        id: "project-2-1",
        title: "Healthcare Patient Portal",
        description:
          "Built a secure patient portal for a major healthcare provider.",
        role: "Full Stack Developer",
        duration: "12 months",
        technologies: [
          { name: "Angular", color: "destructive" },
          { name: ".NET Core", color: "default" },
          { name: "SQL Server", color: "secondary" },
          { name: "Azure", color: "outline" },
        ],
        achievements: [
          "HIPAA compliant implementation",
          "Integrated with 3 EHR systems",
          "Implemented secure messaging system",
        ],
      },
      {
        id: "project-2-2",
        title: "Retail Analytics Dashboard",
        description:
          "Created a real-time analytics dashboard for a retail chain.",
        role: "Frontend Lead",
        duration: "6 months",
        technologies: [
          { name: "Vue.js", color: "default" },
          { name: "D3.js", color: "secondary" },
          { name: "Firebase", color: "destructive" },
        ],
        achievements: [
          "Real-time data visualization",
          "Responsive design for all devices",
          "Customizable reporting features",
        ],
      },
    ],
  },
  {
    id: "company-3",
    name: "Global Tech Partners",
    period: "2016 - 2018",
    description:
      "Provided technology consulting services to international clients.",
    projects: [
      {
        id: "project-3-1",
        title: "Financial Trading Platform",
        description:
          "Developed a high-frequency trading platform for a financial institution.",
        role: "Backend Developer",
        duration: "14 months",
        technologies: [
          { name: "Java", color: "default" },
          { name: "Spring Boot", color: "secondary" },
          { name: "PostgreSQL", color: "outline" },
          { name: "Kafka", color: "destructive" },
        ],
        achievements: [
          "Processed 10,000+ transactions per second",
          "Implemented fault-tolerant architecture",
          "Reduced latency by 65%",
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
    role: "",
    duration: "",
    technologies: [] as Technology[],
    achievements: [] as string[],
  });
  const [currentTech, setCurrentTech] = useState("");
  const [currentAchievement, setCurrentAchievement] = useState("");
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
      role: "",
      duration: "",
      technologies: [],
      achievements: [],
    });
    setCurrentTech("");
    setCurrentAchievement("");
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

  const saveProject = () => {
    if (!selectedCompanyId || !newProjectData.title.trim()) return;

    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: newProjectData.title,
      description: newProjectData.description,
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

        <Accordion type="single" collapsible className="w-full">
          {companiesList.map((company) => (
            <AccordionItem key={company.id} value={company.id}>
              <AccordionTrigger className="hover:bg-muted/50 px-4 rounded-md">
                <div className="flex flex-col sm:flex-row sm:items-center w-full text-left">
                  <h3 className="text-xl font-semibold">{company.name}</h3>
                  <span className="text-muted-foreground sm:ml-auto">
                    {company.period}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="mb-6">
                  <p className="text-muted-foreground">{company.description}</p>
                </div>

                <div className="flex justify-end mb-4">
                  <Button
                    onClick={() => openModal(company.id)}
                    className="flex items-center gap-2"
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                    Adicionar Projeto
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {company.projects.map((project) => (
                    <Card
                      key={project.id}
                      className="overflow-hidden border border-muted"
                    >
                      <CardHeader>
                        <CardTitle>{project.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <span className="font-medium">{project.role}</span>
                          <span className="text-xs text-muted-foreground">
                            ({project.duration})
                          </span>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">{project.description}</p>

                        {expandedProject === project.id &&
                          project.achievements && (
                            <div className="mt-4">
                              <h4 className="font-medium mb-2">
                                Key Achievements:
                              </h4>
                              <ul className="list-disc pl-5 space-y-1">
                                {project.achievements.map(
                                  (achievement, index) => (
                                    <li key={index} className="text-sm">
                                      {achievement}
                                    </li>
                                  ),
                                )}
                              </ul>
                            </div>
                          )}

                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies.map((tech, index) => (
                            <Badge key={index} variant={tech.color}>
                              {tech.name}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between border-t bg-muted/20 pt-3">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              deleteProject(company.id, project.id)
                            }
                            className="text-xs flex items-center gap-1 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                            Deletar
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/project/${project.id}`)}
                            className="text-xs flex items-center gap-1"
                          >
                            <ExternalLink className="h-4 w-4" />
                            Ver Detalhes
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleProjectExpansion(project.id)}
                          className="text-xs flex items-center gap-1"
                        >
                          {expandedProject === project.id
                            ? "Mostrar Menos"
                            : "Mostrar Mais"}
                          <ChevronRight
                            className={`h-4 w-4 transition-transform ${expandedProject === project.id ? "rotate-90" : ""}`}
                          />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

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
