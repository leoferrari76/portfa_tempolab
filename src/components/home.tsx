import React from "react";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import AboutSection from "./AboutSection";
import ProjectShowcase from "./ProjectShowcase";
import ExperienceSection from "./ExperienceSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sobre
            </a>
            <a
              href="#projects"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Projetos
            </a>

          </nav>
          <button className="md:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-menu"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </button>
        </div>
      </header>
      <main className="container py-8 space-y-16">
        {/* Hero Section */}
        <motion.section
          className="py-12 md:py-24 flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="/logo_lf.png"
            alt="Leonardo Ferrari Logo"
            className="h-20 w-auto mb-4"
          />
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Leo Ferrari
          </h1>
          <p className="text-xl md:text-5xl text-muted-foreground max-w-[700px] mb-8">
            Product Designer Lead
            </p>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mb-8">
            Criando experiências digitais que conectam pessoas e marcas através do design intencional e inovador.
          </p>
        </motion.section>

        <Separator />

        {/* About Section */}
        <section id="about" className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <AboutSection />
          </motion.div>
        </section>

        <Separator />

        {/* Experience Section */}
        <section id="experience" className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <ExperienceSection />
          </motion.div>
        </section>

        <Separator />

        {/* Project Showcase */}
        <section id="projects" className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Projetos
            </h2>
            <ProjectShowcase />
          </motion.div>
        </section>

        
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <img
              src="/logo_lf.png"
              alt="Leonardo Ferrari Logo"
              className="h-8 w-auto"
            />
            <span className="text-sm font-medium">
              © 2024 Leonardo Ferrari. Todos os direitos reservados.
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="linkedin.com/in/leonardomoraesferrari" // Substitua pelo seu LinkedIn
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/__leoferrari/" // Substitua pelo seu Instagram
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
            
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
