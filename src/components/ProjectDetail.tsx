import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";

interface ProjectDetailProps {
  projectId?: string;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ projectId }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentProjectId = projectId || id;

  // Mock project data - in a real app, this would come from an API or database
  const projectData = {
    "project-1-1": {
      title: "Enterprise CRM Implementation",
      company: "Tech Innovations Consulting",
      role: "Technical Lead",
      duration: "8 months",
      period: "2021 - 2022",
      description:
        "Implementação de uma solução CRM personalizada para uma empresa Fortune 500, focando em melhorar a eficiência do atendimento ao cliente e integração com sistemas legados.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker"],
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
      ],
      sections: [
        {
          title: "Desafio",
          content:
            "A empresa enfrentava dificuldades significativas no gerenciamento de relacionamento com clientes devido a sistemas fragmentados e processos manuais ineficientes. O tempo de resposta ao cliente estava acima da média do setor, impactando a satisfação e retenção.",
        },
        {
          title: "Solução Implementada",
          content:
            "Desenvolvemos uma solução CRM completa e integrada que centralizou todas as informações dos clientes em uma única plataforma. A solução incluiu automação de processos, dashboards em tempo real e integração com 5 sistemas legados existentes.",
        },
        {
          title: "Tecnologias Utilizadas",
          content:
            "Utilizamos React para o frontend, garantindo uma interface moderna e responsiva. O backend foi desenvolvido em Node.js com MongoDB para flexibilidade de dados. A infraestrutura foi implementada na AWS com containerização Docker para escalabilidade.",
        },
        {
          title: "Resultados Alcançados",
          content:
            "A implementação resultou em uma redução de 45% no tempo de resposta ao cliente, integração bem-sucedida com 5 sistemas legados e implementação de um sistema de relatórios automatizado que economiza 20 horas semanais da equipe.",
        },
      ],
      achievements: [
        "Redução de 45% no tempo de resposta ao cliente",
        "Integração com 5 sistemas legados",
        "Sistema de relatórios automatizado",
        "Melhoria de 60% na satisfação do cliente",
        "Economia de 20 horas semanais da equipe",
      ],
    },
    "project-1-2": {
      title: "Supply Chain Optimization Platform",
      company: "Tech Innovations Consulting",
      role: "Solution Architect",
      duration: "10 months",
      period: "2020 - 2021",
      description:
        "Desenvolvimento de uma plataforma de análise e otimização da cadeia de suprimentos utilizando machine learning para previsão de demanda e otimização de inventário.",
      technologies: ["Python", "TensorFlow", "AWS", "PostgreSQL", "Docker"],
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      ],
      sections: [
        {
          title: "Contexto do Projeto",
          content:
            "A empresa cliente enfrentava desafios significativos na gestão de sua cadeia de suprimentos, com altos custos de inventário e baixa precisão nas previsões de demanda. Era necessária uma solução que utilizasse dados históricos para otimizar processos.",
        },
        {
          title: "Arquitetura da Solução",
          content:
            "Projetamos uma arquitetura robusta utilizando microserviços em Python, com modelos de machine learning em TensorFlow para análise preditiva. A plataforma foi hospedada na AWS com alta disponibilidade e escalabilidade automática.",
        },
        {
          title: "Implementação de IA",
          content:
            "Desenvolvemos algoritmos de machine learning personalizados para previsão de demanda, utilizando dados históricos de vendas, sazonalidade e fatores externos. Os modelos foram treinados com TensorFlow e otimizados para precisão máxima.",
        },
        {
          title: "Impacto nos Negócios",
          content:
            "A plataforma gerou economia significativa nos custos de inventário e melhorou drasticamente a precisão das entregas. O sistema de análise preditiva permitiu à empresa antecipar tendências de mercado e ajustar estratégias proativamente.",
        },
      ],
      achievements: [
        "Redução de 23% nos custos de inventário",
        "Melhoria de 34% na precisão do tempo de entrega",
        "Implementação de análise preditiva para previsão de demanda",
        "Automação de 80% dos processos de reposição",
        "ROI de 300% no primeiro ano",
      ],
    },
    "1": {
      title: "E-commerce Platform",
      company: "Projeto Freelance",
      role: "Full Stack Developer",
      duration: "6 meses",
      period: "2023",
      description:
        "Desenvolvimento completo de uma plataforma de e-commerce responsiva com catálogo de produtos, carrinho de compras e integração de pagamentos.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS"],
      images: [
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
      ],
      sections: [
        {
          title: "Visão Geral do Projeto",
          content:
            "Desenvolvimento de uma plataforma de e-commerce completa para um cliente do setor de moda. O projeto incluiu desde o design da interface até a implementação do backend, sistema de pagamentos e deploy em produção.",
        },
        {
          title: "Funcionalidades Principais",
          content:
            "A plataforma conta com catálogo de produtos com filtros avançados, carrinho de compras persistente, sistema de checkout seguro, painel administrativo para gestão de produtos e pedidos, e sistema de notificações por email.",
        },
        {
          title: "Integração de Pagamentos",
          content:
            "Implementamos integração completa com Stripe para processamento seguro de pagamentos, incluindo suporte a múltiplos métodos de pagamento, webhooks para confirmação de transações e sistema de reembolsos automatizado.",
        },
        {
          title: "Performance e Segurança",
          content:
            "A aplicação foi otimizada para performance com lazy loading, cache inteligente e CDN. Implementamos medidas de segurança robustas incluindo autenticação JWT, validação de dados e proteção contra ataques comuns.",
        },
      ],
      achievements: [
        "Plataforma totalmente responsiva",
        "Integração segura com Stripe",
        "Painel administrativo completo",
        "Performance otimizada (< 3s loading)",
        "Sistema de notificações automatizado",
      ],
    },
  };

  const project = projectData[currentProjectId as keyof typeof projectData];

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
              <p className="text-xl text-muted-foreground">{project.company}</p>
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
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                {project.period}
              </div>
            </div>
          </div>

          <p className="text-lg leading-relaxed mb-6">{project.description}</p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        {/* Project Images */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Galeria do Projeto</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.map((image, index) => (
              <div
                key={index}
                className="aspect-video overflow-hidden rounded-lg"
              >
                <img
                  src={image}
                  alt={`${project.title} - Imagem ${index + 1}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Project Sections */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Detalhes do Projeto</h2>
          <div className="space-y-8">
            {project.sections.map((section, index) => (
              <div key={index} className="bg-card p-6 rounded-lg border">
                <h3 className="text-xl font-semibold mb-4">{section.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Principais Conquistas</h2>
          <div className="bg-card p-6 rounded-lg border">
            <ul className="space-y-3">
              {project.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span className="text-muted-foreground">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Button
            onClick={() => navigate("/")}
            size="lg"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao Portfólio
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;
