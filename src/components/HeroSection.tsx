"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TetrisBackground from "./TetrisBackground";
import ParticleButton from "./ParticleButton";

const titles = [
  "Ingeniero en Desarrollo de Aplicaciones",
  "Software Development Engineer",
];

function useTypewriter(texts: string[], speed = 60, pause = 2200) {
  const [display, setDisplay] = useState("");
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed);
      return () => clearTimeout(t);
    }

    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
      return () => clearTimeout(t);
    }

    if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((i) => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  useEffect(() => {
    setDisplay(texts[textIdx].slice(0, charIdx));
  }, [charIdx, textIdx, texts]);

  return { display, textIdx };
}

export default function HeroSection() {
  const { display, textIdx } = useTypewriter(titles, 55, 2500);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <TetrisBackground />

      <div className="absolute inset-0 bg-linear-to-b from-background/0 via-background/50 to-background pointer-events-none" />

      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            Disponible para nuevos proyectos
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-bold mb-6 leading-tight"
        >
          <span className="bg-linear-to-r from-neon-purple via-neon-cyan to-neon-blue bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(168,85,247,0.3)]">
            Andy  Flores
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 h-16 flex flex-col items-center justify-center"
        >
          <p
            className={`text-xl sm:text-2xl font-semibold font-mono transition-colors duration-300 ${
              textIdx === 0 ? "text-foreground/90" : "text-neon-cyan/80"
            }`}
          >
            {display}
            <span className="inline-block w-0.5 h-6 bg-neon-purple ml-1 animate-pulse align-middle" />
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-foreground/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Desarrollador apasionado por crear sueños que transforman ideas en soluciones web modernas, escalables y
          con experiencias de usuario excepcionales. Especializado en nuevas tecnologías con enfoque en rendimiento y diseño limpio.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <ParticleButton
            onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-3.5 bg-linear-to-r from-neon-purple to-neon-blue text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]"
            particleColor="#a855f7"
          >
            <span className="absolute inset-0 bg-linear-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              Ver Proyectos
            </span>
          </ParticleButton>
          <ParticleButton
            onClick={() => window.open('/cv.pdf', '_blank')}
            className="group px-8 py-3.5 border border-neon-cyan/40 text-neon-cyan font-semibold rounded-lg hover:bg-neon-cyan/10 transition-all duration-300 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            particleColor="#06b6d4"
          >
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download CV
            </span>
          </ParticleButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <a href="#sobre-mi" className="inline-block">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-foreground/30 hover:text-neon-purple/60 transition-colors cursor-pointer"
            >
              <svg
                className="w-6 h-6 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
