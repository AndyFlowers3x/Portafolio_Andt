"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FallingBlock {
  id: number;
  x: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
  shape: number[][];
}

const TETRIS_COLORS = [
  "#a855f7",
  "#06b6d4",
  "#3b82f6",
  "#ec4899",
  "#10b981",
  "#f59e0b",
  "#f97316",
];

const SHAPES = [
  [[1, 1], [1, 1]],
  [[1, 1, 1, 1]],
  [[1, 1, 0], [0, 1, 1]],
  [[0, 1, 1], [1, 1, 0]],
  [[1, 0], [1, 0], [1, 1]],
  [[0, 1], [0, 1], [1, 1]],
  [[1, 1, 1], [0, 1, 0]],
];

export default function TetrisBackground() {
  const [blocks, setBlocks] = useState<FallingBlock[]>([]);

  useEffect(() => {
    const generated: FallingBlock[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 12 + Math.random() * 18,
      color: TETRIS_COLORS[Math.floor(Math.random() * TETRIS_COLORS.length)],
      size: 14 + Math.random() * 10,
      shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    }));
    setBlocks(generated);
  }, []);

  if (blocks.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          className="absolute"
          style={{ left: `${block.x}%` }}
          initial={{ y: "-10vh", rotate: 0, opacity: 0 }}
          animate={{
            y: "110vh",
            rotate: 360,
            opacity: [0, 0.4, 0.4, 0],
          }}
          transition={{
            duration: block.duration,
            delay: block.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div className="flex flex-col gap-[2px]">
            {block.shape.map((row, ri) => (
              <div key={ri} className="flex gap-[2px]">
                {row.map((cell, ci) => (
                  <div
                    key={ci}
                    style={{
                      width: block.size,
                      height: block.size,
                      backgroundColor: cell ? block.color : "transparent",
                      boxShadow: cell
                        ? `0 0 ${block.size / 2}px ${block.color}40`
                        : "none",
                      borderRadius: 2,
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
