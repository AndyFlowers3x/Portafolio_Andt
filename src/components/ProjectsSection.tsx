"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  color: string;
  shadow: string;
  github: string;
  demo?: string;

}

const projects: Project[] = [
  {
    title: "E-Commerce Platform",
    description:
      "Plataforma de comercio electrónico completa con carrito de compras, pasarela de pagos y panel de administración. Diseñada para escalar con miles de productos y usuarios concurrentes.",
    technologies: ["PHP", "Js", "MySQL", "HTML5", "CSS3"],
    color: "#a855f7",
    shadow: "shadow-neon-purple/20",
    github: "https://github.com/AndyFlowers3x/NativyShop"
  },
  {
    title: "Ptc One",
    description:
      "Plataforma de gestión de tareas Academicas, con asignación automática, seguimiento de progreso y análisis de rendimiento para estudiantes y profesores.",
    technologies: ["PHP", "Node.js", "MongoDB", "HTML5", "CSS3"],
    color: "#06b6d4",
    shadow: "shadow-neon-cyan/20",
    github: ""
  },
  {
    title: "Texas Marketing Strategies",
    description:
      "Pagina web para una empresa de marketing digital en Texas, con diseño moderno, integración de redes sociales y optimización SEO para atraer clientes locales.",
    technologies: ["HTML5", "CSS3", "WordPress", "Js"],
    color: "#3b82f6",
    shadow: "shadow-neon-blue/20",
    github: "####",
    demo: "https://texasmarketingstrategies.net",
  },
  {
    title: "Nutri WPS",
    description:
      "Aplicación móvil de seguimiento nutricional , recomendaciones personalizadas y sincronización con dispositivos de fitness.",
    technologies: ["Php", "Css", "Js", "PostgreSQL", "Google Clud", "Api Rest", "Superbase", "Flutter"],
    color: "#ec4899",
    shadow: "shadow-neon-pink/20",
    github: "https://github.com/AndyFlowers3x/nutricionplatform",
    demo: "https://demo.com",
  },

];

const tetrisShapes = [
  "col-span-2 row-span-1",
  "col-span-1 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
];

export default function ProjectsSection() {
  return (
    <SectionWrapper id="proyectos">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-2">
          <span className="text-neon-blue">&lt;</span>
          Proyectos
          <span className="text-neon-blue">/&gt;</span>
        </h2>
        <p className="text-neon-cyan/60 font-mono text-sm">Featured Projects</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 50, rotate: -2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
              duration: 0.6,
              delay: i * 0.1,
              type: "spring",
              stiffness: 100,
            }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className="group"
          >
            <div
              className="h-full rounded-xl border border-border-color bg-surface-light p-6 transition-all duration-300 hover:border-transparent relative overflow-hidden"
              style={{
                boxShadow: `0 0 0 rgba(0,0,0,0)`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${project.color}15, 0 4px 20px rgba(0,0,0,0.3)`;
                (e.currentTarget as HTMLElement).style.borderColor = `${project.color}40`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 rgba(0,0,0,0)`;
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ backgroundColor: project.color }}
              />

              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${project.color}15`,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  <svg
                    className="w-5 h-5"
                    style={{ color: project.color }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-white transition-colors">
                {project.title}
              </h3>

              <p className="text-foreground/60 text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-mono rounded-md bg-background/50 text-foreground/50 border border-border-color"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </a>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm hover:text-foreground transition-colors"
                  style={{ color: project.color }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Live Demo
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
