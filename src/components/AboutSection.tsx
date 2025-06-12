import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface AboutSectionProps {
  name?: string;
  title?: string;
  bio?: string;
  skills?: string[];
  speakerImage?: string;
  contactEmail?: string;
  phone?: string;
  location?: string;
}

const AboutSection = ({
  name = "Leonardo Ferrari",
  title = "UX Designer Sênior | Estratégia, operação e execução ponta-a-ponta",
  bio = "Sou designer com mais de 10 anos de experiência em UX, atuando do início ao fim dos projetos — da imersão com stakeholders à entrega de soluções testadas e validadas. Tenho facilidade em traduzir contextos complexos em produtos claros, objetivos e centrados no usuário. Já atuei em segmentos como finanças, saúde, indústria farmacêutica e educação, sempre focando na clareza do processo, conexão com o negócio e valor real entregue.",
  skills = [
    "Figma",
    "FigJam",
    "Miro",
    "Notion",
    "Adobe CC",
    "Metodologias Ágeis",
    "UX Research",
    "Design Systems",
    "Prototipação",
    "IA aplicada ao Design",
  ],
  speakerImage = "/leoferrari.png",
  contactEmail = "leoferrari@gmail.com",
  phone = "(19) 99128-6811",
  location = "Campinas – SP",
}: AboutSectionProps) => {
  return (
    <section className="w-full md:py-24 bg-background py-0">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Speaker Image */}
          <div className="w-full flex justify-center md:justify-end md:w-1/2">
            <div className="relative w-full aspect-[3/4] rounded-lg overflow-hidden container">
              <img
                src={speakerImage}
                alt={`${name} speaking at an event`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bio Content */}
          <div className="w-full md:w-1/2 space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tighter">
                {name}
              </h1>
              <p className="text-lg text-muted-foreground">{title}</p>
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                <span>📍 {location}</span>
                <span>📧 {contactEmail}</span>
                <span>📱 {phone}</span>
              </div>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Sobre mim</h2>
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
              <p className="text-muted-foreground leading-relaxed">
                Me destaco por facilitar decisões, organizar fluxos e formar
                designers com visão de produto. Tenho investigado como IA e
                ferramentas no-code podem potencializar o trabalho de designers
                e acelerar a entrega de valor em produtos digitais.
              </p>
            </div>
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">
                Ferramentas & Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
