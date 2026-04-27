"use client";

import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import MiniTetrisGame from "./MiniTetrisGame";

const TETRIS_GRID = [
  [0, 0, 1, 1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0, 1, 1, 0],
  [1, 1, 0, 0, 1, 1, 0, 0],
  [1, 0, 0, 1, 1, 0, 0, 1],
  [0, 0, 1, 1, 0, 0, 1, 1],
  [0, 1, 1, 0, 1, 1, 0, 0],
  [1, 1, 0, 1, 1, 0, 0, 1],
  [0, 0, 1, 0, 0, 1, 1, 1],
];

const PALETTE = ["#a855f7", "#06b6d4", "#3b82f6", "#ec4899", "#10b981", "#f59e0b"];

export default function AboutSection() {
  return (
    <SectionWrapper id="sobre-mi">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              <span className="text-neon-purple">&lt;</span>
              Sobre Mí
              <span className="text-neon-purple">/&gt;</span>
            </h2>
            <p className="text-neon-cyan/60 font-mono text-sm mb-6">
              About Me
            </p>
            <div className="space-y-4 text-foreground/70 leading-relaxed">
              <p>
                Soy un Ingeniero en Desarrollo de Aplicaciones con experiencia en
                la creación de soluciones digitales innovadoras. Mi enfoque combina
                la excelencia técnica con un diseño centrado en el usuario para
                entregar productos que realmente impactan.
              </p>
              <p>
                Con conocimientos en desarrollo, Me apasiona la arquitectura limpia, las
                buenas prácticas y la mejora continua para poder escalar.
              </p>
              <p>
                Cuando no estoy programando, me gusta explorar nuevas tecnologías,
                contribuir a proyectos open source y compartir conocimiento con la
                comunidad de desarrolladores.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {[
                { icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z", label: "Ing. Desarrollo de Apps" },
                { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", label: "México" },
                { icon: "M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z", label: "Marketing Digital" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-color bg-surface-light/50 text-foreground/60 text-sm"
                >
                  <svg className="w-4 h-4 text-neon-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                  {item.label}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div
            className="absolute -inset-8 rounded-full pointer-events-none opacity-40"
            style={{
              background:
                "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col items-center gap-6">
            <div className="relative grid grid-cols-8 gap-1.5 sm:gap-2 max-w-sm mx-auto md:mx-0 md:ml-auto">
              {TETRIS_GRID.flat().map((cell, i) => {
                const color = PALETTE[i % PALETTE.length];
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.35,
                      delay: i * 0.015,
                      type: "spring",
                      stiffness: 200,
                    }}
                    whileHover={
                      cell
                        ? { scale: 1.25, rotate: 5, transition: { duration: 0.15 } }
                        : undefined
                    }
                    className="aspect-square rounded-sm cursor-default"
                    style={
                      cell
                        ? {
                          backgroundColor: color,
                          boxShadow: `0 0 12px ${color}35, inset 0 1px 0 rgba(255,255,255,0.15)`,
                        }
                        : {
                          backgroundColor: "rgba(26,26,36,0.4)",
                          border: "1px solid rgba(42,42,58,0.3)",
                        }
                    }
                  />
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="w-full"
            >
              <MiniTetrisGame />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
