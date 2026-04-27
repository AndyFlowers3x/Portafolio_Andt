"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  color?: string;
}

export default function SectionDivider({ color = "#a855f7" }: SectionDividerProps) {
  return (
    <div className="relative h-px w-full overflow-hidden">
      <div className="absolute inset-0 bg-border-color" />
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute inset-0 w-1/3"
        style={{
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        }}
      />
    </div>
  );
}
