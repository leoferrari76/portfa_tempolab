import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  image?: string;
  technologies?: string[];
  onClick?: () => void;
}

const ProjectCard = ({
  title = "Project Title",
  description = "This is a brief description of the project and what was accomplished.",
  image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80",
  technologies = ["React", "TypeScript", "Tailwind CSS"],
  onClick = () => console.log("Project card clicked"),
}: ProjectCardProps) => {
  return (
    <Card className="w-full max-w-[350px] h-[400px] flex flex-col overflow-hidden bg-white">
      <div className="h-[180px] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="line-clamp-1">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>

        <div className="mt-4 flex flex-wrap gap-1">
          {technologies.map((tech, index) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button onClick={onClick} className="w-full">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
