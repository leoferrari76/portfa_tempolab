import React from "react";

const experiences = [
  {
    company: "UNIPAC",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_UNIPAC.png",
    role: "UX Designer Sênior",
    period: "2022 - Atual",
  },
  {
    company: "Banco XPTO",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg",
    role: "Product Designer",
    period: "2020 - 2022",
  },
  {
    company: "Agência Criativa",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    role: "Designer Gráfico",
    period: "2017 - 2020",
  },
];

const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight mb-8">Experiência Profissional</h2>
        <div className="flex flex-wrap gap-12 justify-center items-center">
          {experiences.map((exp, idx) => (
            <div key={idx} className="flex flex-col items-center group">
              <img
                src={exp.logo}
                alt={exp.company}
                className="h-16 w-auto grayscale group-hover:grayscale-0 transition duration-300 drop-shadow-md mb-2"
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