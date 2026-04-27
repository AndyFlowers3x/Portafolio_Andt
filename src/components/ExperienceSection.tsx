"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  color: string;
}

const experiences: Experience[] = [
  {
    role: "Lider de Proyecto",
    company: "TESFP",
    period: "2023-2024",
    description:
      "Realicé el mantenimiento y desarrollo de la plataforma en línea , implementando nuevas funcionalidades y mejorando la experiencia del usuario. Además, lideré un equipo para automatizar procesos de gestión académica mediante bots de Telegram, mejorando la eficiencia y comunicación con alumnos y personal docente.",
    technologies: ["html5", "CSS3", "JavaScript", "PHP"],
    color: "#a855f7",
  },
  {
    role: "Programador Freelance",
    company: "Autonomo",
    period: "2025 — 2025",
    description:
      "Desarrollo de aplicaciones web full-stack para clientes de diversos sectores. Colaboración directa con equipos de diseño UX/UI para implementar interfaces modernas y accesibles. Integración de APIs de terceros y sistemas de pago.",
    technologies: ["html5", "Node.js", "PHP", "MySQL", "Css3"],
    color: "#06b6d4",
  },
  {
    role: "Encargo de Area de Web /Seo",
    company: "Texas Marketing Strategies",
    period: "2025 — 2026",
    description:
      "Diseño y desarrollo de plataformas web optimizadas para SEO, implementando estrategias de marketing digital para mejorar la visibilidad en buscadores. Colaboración con equipos de marketing para integrar soluciones tecnológicas que mejoren el posicionamiento orgánico y la experiencia del usuario.",
    technologies: ["Wordpress", "Aplicaciones Moviles", "SEO", "Marketing Digital", "Google Analytics", "JavaScript"],
    color: "#10b981",
  },

];

export default function ExperienceSection() {
  return (
    <SectionWrapper id="experiencia" className="bg-surface/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="text-neon-green">&lt;</span>
          Experiencia
          <span className="text-neon-green">/&gt;</span>
        </h2>
        <p className="text-neon-cyan/60 font-mono text-sm">Work Experience</p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-neon-purple via-neon-cyan to-neon-blue" />

        {experiences.map((exp, i) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={`relative mb-12 pl-12 md:pl-0 md:w-1/2 ${i % 2 === 0
              ? "md:pr-12 md:text-right"
              : "md:ml-auto md:pl-12"
              }`}
          >
            <div
              className="hidden md:block absolute top-1 w-3 h-3 rounded-full border-2 border-background"
              style={{
                backgroundColor: exp.color,
                boxShadow: `0 0 12px ${exp.color}60`,
                ...(i % 2 === 0
                  ? { right: "-6.5px" }
                  : { left: "-6.5px" }),
              }}
            />

            <div
              className="md:hidden absolute left-2.5 top-1 w-3 h-3 rounded-full border-2 border-background"
              style={{
                backgroundColor: exp.color,
                boxShadow: `0 0 12px ${exp.color}60`,
              }}
            />

            <div className="rounded-xl border border-border-color bg-surface-light p-5 hover:border-transparent transition-all duration-300 group"
              style={{
                ["--hover-color" as string]: exp.color,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${exp.color}40`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 20px ${exp.color}10`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <span
                className="inline-block px-3 py-1 text-xs font-mono rounded-full mb-3"
                style={{
                  backgroundColor: `${exp.color}15`,
                  color: exp.color,
                  border: `1px solid ${exp.color}30`,
                }}
              >
                {exp.period}
              </span>

              <h3 className="text-lg font-bold text-foreground mb-1">
                {exp.role}
              </h3>
              <p className="text-sm font-medium mb-3" style={{ color: exp.color }}>
                {exp.company}
              </p>
              <p className="text-foreground/60 text-sm leading-relaxed mb-4 text-left">
                {exp.description}
              </p>

              <div className={`flex flex-wrap gap-2 ${i % 2 === 0 ? "md:justify-end" : ""}`}>
                {exp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs font-mono rounded bg-background/50 text-foreground/50 border border-border-color"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
