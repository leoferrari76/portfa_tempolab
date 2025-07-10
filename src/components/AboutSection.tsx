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
  bio = "Sou designer com mais de 10 anos de experiência em UX, atuando de ponta a ponta nos projetos, desde a imersão com stakeholders até a entrega de soluções testadas, validadas e prontas para escalar.",
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
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">Sobre mim</h2>
              <p className="text-muted-foreground leading-relaxed">{bio}</p>
              <p className="text-muted-foreground leading-relaxed">
              Tenho facilidade em traduzir contextos complexos em produtos claros, objetivos e centrados no usuário. Já atuei em segmentos como finanças, saúde, indústria farmacêutica, agronegócio e educação, sempre com foco em clareza de processos, conexão com o negócio e entrega de valor real.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Hoje, além de atuar no desenvolvimento de produtos digitais, também colaboro com o time comercial em projetos de pré-venda, ajudando a construir propostas que mostram, de forma estratégica, como o design pode gerar impacto desde o início dos projetos.
              </p>
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
