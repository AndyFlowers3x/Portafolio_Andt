"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

const stats: Stat[] = [
  { label: "Años de Experiencia", value: 1, suffix: "+", color: "#a855f7" },
  { label: "Proyectos Completados", value: 10, suffix: "+", color: "#06b6d4" },
  { label: "Tecnologías Dominadas", value: 8, suffix: "", color: "#3b82f6" },
  { label: "Clientes Satisfechos", value: 7, suffix: "+", color: "#10b981" },
];

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);

  return count;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(stat.value, 2000, visible);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      <div className="text-center p-6 rounded-xl border border-border-color bg-surface-light/50 hover:border-transparent transition-all duration-300"
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = `${stat.color}40`;
          (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${stat.color}12`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "";
          (e.currentTarget as HTMLElement).style.boxShadow = "";
        }}
      >
        <div
          className="text-4xl sm:text-5xl font-bold font-mono mb-2"
          style={{ color: stat.color }}
        >
          {count}
          {stat.suffix}
        </div>
        <p className="text-foreground/60 text-sm">{stat.label}</p>
      </div>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="relative py-16">
      <div className="tetris-grid-bg absolute inset-0 pointer-events-none" />
      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
