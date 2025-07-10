import React from "react";

const experiences = [
  {
    company: "levva",
    role: "Empresa levva",
    logo: "public/levva.png",
    period: "2024 - atualmente",
  },
  {
    company: "CI&T",
    logo: "public/cit.png",
    role: "Empresa CI&T",
    period: "2020-2024",
  },
  {
    company: "ABINBEV",
    logo: "public/abinbev.png",
    role: "Empresa ABINBEV",
    period: "2018-2020",
  },
  {
    company: "levva",
    logo: "public/artesanal.png",
    role: "levva/Projeto Artesanal",
    period: "2025",
  },
  {
    company: "levva",
    logo: "public/ache.png",
    role: "levva/Projeto Aché",
    period: "2024",
  },
  {
    company: "levva",
    logo: "public/gdm.png",
    role: "levva/Projeto GDM",
    period: "2024",
  },
  {
    company: "levva",
    logo: "public/unipac.png",
    role: "levva/Projeto Unipac",
    period: "2024",
  },
  {
    company: "Ci&T",
    logo: "public/vr.png",
    role: "CI&T/Projeto VR",
    period: "2023",
  },
  {
    company: "CI&T",
    logo: "public/anbima.png",
    role: "CI&T/Projeto Anbima",
    period: "2023",
  },
  {
    company: "CI&T",
    logo: "public/janssen.png",
    role: "CI&T/Projeto JanssenPro",
    period: "2020-2022",
  },
  {
    company: "Ci&T",
    logo: "public/bitz.png",
    role: "CI&T/Projeto Bitz",
    period: "2022",
  },
  {
    company: "Ci&T",
    logo: "public/next.png",
    role: "CI&T/Projeto Next",
    period: "2022",
  },

];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Empresas e Projetos</h2>
        <div className="flex flex-wrap gap-12 justify-center items-center">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <img
                src={exp.logo}
                alt={exp.company}
                className="h-12 w-auto transition duration-300 mb-2"
                title={exp.company}
              />
              <span className="text-xs text-muted-foreground font-medium text-center">{exp.period}</span>
              <span className="text-xs text-muted-foreground text-center">{exp.role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection; 