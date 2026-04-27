"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface ParticleButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  particleColor?: string;
}

export default function ParticleButton({ 
  children, 
  onClick, 
  className = "", 
  particleColor = "#a855f7" 
}: ParticleButtonProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
      color: particleColor,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    setTimeout(() => {
      setParticles((prev) => 
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 1000);

    onClick?.();
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
    >
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ 
              x: particle.x, 
              y: particle.y, 
              scale: 0,
              opacity: 1 
            }}
            animate={{
              x: particle.x + (Math.random() - 0.5) * 100,
              y: particle.y + (Math.random() - 0.5) * 100,
              scale: [0, 1, 0],
              opacity: [1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
            className="absolute w-2 h-2 rounded-full pointer-events-none"
            style={{
              backgroundColor: particle.color,
              boxShadow: `0 0 6px ${particle.color}`,
              left: 0,
              top: 0,
            }}
          />
        ))}
      </AnimatePresence>
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
}
