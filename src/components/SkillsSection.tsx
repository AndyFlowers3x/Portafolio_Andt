"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";

const skills = [
  { name: "HTML5", color: "#e34c26", icon: "🌐", description: "Estructura semántica" },
  { name: "CSS3", color: "#1572b6", icon: "🎨", description: "Diseño responsive" },
  { name: "JavaScript", color: "#f7df1e", icon: "⚡", description: "Interactividad dinámica" },
  { name: "SQL", color: "#336791", icon: "🗄️", description: "Bases de datos" },
  { name: "PHP", color: "#777bb4", icon: "🐘", description: "Backend robusto" },
  { name: "WordPress", color: "#0073aa", icon: "📝", description: "CMS personalizado" },
  { name: "Python", color: "#3776ab", icon: "🐍", description: "Automatización IA" },
  { name: "Kotlin", color: "#3776ab", icon: "🟪", description: "Desarrollo de Apps" },
  { name: "Dart", color: "#003057", icon: "🔷", description: "Desarrollo de Apps" },


];

function SkillCard({ skill, index }: { skill: typeof skills[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, rotateY: -90, scale: 0.8 }}
      whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.1,
        rotateZ: [0, -2, 2, 0],
        transition: { duration: 0.3 }
      }}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d"
      }}
      className="relative group"
    >
      <div
        className="relative p-4 rounded-lg border border-border-color bg-surface-light/50 hover:border-transparent transition-all duration-300 cursor-pointer overflow-hidden"
        style={{
          boxShadow: isHovered ? `0 0 20px ${skill.color}40, 0 5px 20px ${skill.color}20` : "none",
          transform: isHovered ? "translateZ(10px)" : "translateZ(0)"
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${skill.color}10 0%, transparent 50%)`
          }}
        />

        <motion.div
          className="text-2xl mb-2"
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            rotate: isHovered ? [0, -15, 15, 0] : 0
          }}
          transition={{ duration: 0.6 }}
        >
          {skill.icon}
        </motion.div>

        <h3 className="text-sm font-bold text-foreground mb-1">{skill.name}</h3>

        <p className="text-xs text-foreground/60 text-center leading-tight">
          {skill.description}
        </p>

        {/* Efectos decorativos dinámicos */}
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-0"
          style={{ backgroundColor: skill.color }}
          animate={{
            opacity: isHovered ? [0, 0.6, 0] : 0,
            scale: isHovered ? [0, 1.5, 0] : 0,
          }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="absolute -bottom-1 -left-1 w-4 h-4 rounded-full opacity-0"
          style={{ backgroundColor: skill.color }}
          animate={{
            opacity: isHovered ? [0, 0.4, 0] : 0,
            scale: isHovered ? [0, 1.2, 0] : 0,
          }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />

        {/* Línea decorativa inferior */}
        <motion.div
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 rounded-full"
          style={{ backgroundColor: skill.color }}
          initial={{ width: 0 }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut"
          }}
        />

        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs"
            style={{
              backgroundColor: skill.color,
              boxShadow: `0 0 15px ${skill.color}`
            }}
          >
            ✨
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <SectionWrapper id="habilidades">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">
            <span className="text-neon-purple">&lt;</span>
            Habilidades
            <span className="text-neon-purple">/&gt;</span>
          </h2>
          <p className="text-neon-cyan/60 font-mono text-sm">Skills</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-purple/30 bg-neon-purple/5 text-neon-purple text-sm">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            ¡Haz hover sobre las habilidades para ver la magia!
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
