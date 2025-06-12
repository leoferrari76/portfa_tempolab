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

  const categories = [
    "all",
    ...Array.from(new Set(projects.map((project) => project.category))),
  ];

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="w-full bg-background py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-2">
            Freelance Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my independent work across various industries and
            technologies.
          </p>
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
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.technologies.map((tech, index) => (
                        <Badge key={index} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View Details
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
