import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Plus, Trash2, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  technologies: string[];
  link?: string;
}

interface FreelanceGalleryProps {
  projects?: Project[];
}

const FreelanceGallery = ({
  projects = defaultProjects,
}: FreelanceGalleryProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [projectsList, setProjectsList] = useState<Project[]>(projects);
  const navigate = useNavigate();

  const categories = [
    "all",
    ...Array.from(new Set(projectsList.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projectsList
      : projectsList.filter((project) => project.category === selectedCategory);

  const addNewProject = () => {
    const newProject: Project = {
      id: `project-${Date.now()}`,
      title: "Novo Projeto",
      description: "Descrição do novo projeto freelance",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
      category: "web",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
    };

    setProjectsList((prev) => [...prev, newProject]);
  };

  const deleteProject = (projectId: string) => {
    setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
  };

  return (
    <div className="w-full bg-background py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Projetos Freelance
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Uma coleção dos meus trabalhos independentes em várias indústrias e
            tecnologias.
          </p>
          <div className="flex justify-center mt-6">
            <Button onClick={addNewProject} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Adicionar Projeto
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={selectedCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden h-full flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="object-cover w-full h-full transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.category}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-sm text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: project.description }}
                    ></p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 flex items-center gap-2"
                      onClick={() => navigate(`/project/${project.id}`)}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Ver Detalhes
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteProject(project.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

// Default projects data for when no props are provided
const defaultProjects: Project[] = [
  {
    id: "1",
    title: "E-commerce Platform",
    description:
      "A fully responsive e-commerce platform with product catalog, shopping cart, and payment integration.",
    image:
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
    category: "web",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
  },
  {
    id: "2",
    title: "Fitness Tracking App",
    description:
      "Mobile application for tracking workouts, nutrition, and progress with personalized recommendations.",
    image:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&q=80",
    category: "mobile",
    technologies: ["React Native", "Firebase", "Redux"],
  },
  {
    id: "3",
    title: "Real Estate Listing Portal",
    description:
      "Property listing website with advanced search filters, map integration, and agent contact system.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    category: "web",
    technologies: ["Vue.js", "Express", "PostgreSQL", "Google Maps API"],
  },
  {
    id: "4",
    title: "Restaurant Management System",
    description:
      "Comprehensive system for restaurant operations including reservations, ordering, and inventory management.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    category: "desktop",
    technologies: ["Electron", "React", "SQLite"],
  },
  {
    id: "5",
    title: "Event Planning Platform",
    description:
      "Platform for planning and managing events with ticketing, attendee management, and analytics.",
    image:
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
    category: "web",
    technologies: ["Angular", "Node.js", "MongoDB"],
  },
  {
    id: "6",
    title: "Personal Finance Tracker",
    description:
      "Mobile app for tracking expenses, budgeting, and financial goal setting with visualization tools.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    category: "mobile",
    technologies: ["Flutter", "Firebase", "Charts.js"],
  },
];

export default FreelanceGallery;
