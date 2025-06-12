import React from "react";
import { motion } from "framer-motion";
import { Separator } from "./ui/separator";
import AboutSection from "./AboutSection";
import ProjectShowcase from "./ProjectShowcase";
import FreelanceGallery from "./FreelanceGallery";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header with Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                LF
              </span>
            </div>
            <span className="text-xl font-bold">Leonardo Ferrari</span>
          </div>
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
            <a
              href="#freelance"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Experiência
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contato
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
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            Leonardo Ferrari
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-[700px] mb-8">
            UX Designer Sênior | Estratégia, operação e execução ponta-a-ponta
          </p>
          <div className="flex gap-4">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90"
            >
              Entre em Contato
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Ver Projetos
            </a>
          </div>
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

        {/* Project Showcase */}
        <section id="projects" className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Projetos de Consultoria
            </h2>
            <ProjectShowcase />
          </motion.div>
        </section>

        <Separator />

        {/* Freelance Gallery */}
        <section id="freelance" className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8">
              Experiência Profissional
            </h2>
            <FreelanceGallery />
          </motion.div>
        </section>

        <Separator />

        {/* Contact Section */}
        <section id="contact" className="py-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
              Entre em Contato
            </h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Nome
                </label>
                <input
                  id="name"
                  type="text"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Seu nome"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Seu email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Sua mensagem"
                ></textarea>
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-md bg-primary text-primary-foreground h-10 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary/90"
              >
                Enviar Mensagem
              </button>
            </form>
          </motion.div>
        </section>
      </main>
      <footer className="border-t bg-muted/40">
        <div className="container py-8 md:py-12 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                LF
              </span>
            </div>
            <span className="text-sm font-medium">
              © 2024 Leonardo Ferrari. Todos os direitos reservados.
            </span>
          </div>
          <div className="flex gap-4">
            <a
              href="#"
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
              href="#"
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
                className="lucide lucide-github"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
            <a
              href="#"
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
                className="lucide lucide-twitter"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
