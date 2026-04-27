"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Piece {
  id: number;
  x: number;
  y: number;
  emoji: string;
  color: string;
  size: number;
  rotation: number;
}

const TETRIS_PIECES = [
  { emoji: "🟦", color: "#06b6d4" },
  { emoji: "🟩", color: "#10b981" },
  { emoji: "🟪", color: "#a855f7" },
  { emoji: "🟨", color: "#f59e0b" },
  { emoji: "🟥", color: "#ef4444" },
];

export default function FloatingTetris() {
  const [pieces, setPieces] = useState<Piece[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleClick = (e: MouseEvent) => {
      const piece = TETRIS_PIECES[Math.floor(Math.random() * TETRIS_PIECES.length)];
      const newPiece: Piece = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
        emoji: piece.emoji,
        color: piece.color,
        size: 20 + Math.random() * 30,
        rotation: Math.random() * 360,
      };

      setPieces((prev) => [...prev, newPiece]);

      setTimeout(() => {
        setPieces((prev) => prev.filter((p) => p.id !== newPiece.id));
      }, 3000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {pieces.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              scale: 0, 
              rotate: 0,
              x: piece.x - mousePos.x,
              y: piece.y - mousePos.y
            }}
            animate={{ 
              scale: [0, 1.5, 1],
              rotate: piece.rotation,
              x: (piece.x - mousePos.x) * 0.1,
              y: (piece.y - mousePos.y) * 0.1,
              opacity: [0, 1, 1, 0]
            }}
            exit={{ 
              scale: 0,
              opacity: 0,
              rotate: piece.rotation + 180
            }}
            transition={{ 
              duration: 3,
              ease: "easeOut",
              opacity: { duration: 2.5 }
            }}
            className="absolute"
            style={{
              left: piece.x,
              top: piece.y,
              fontSize: `${piece.size}px`,
              filter: `drop-shadow(0 0 10px ${piece.color})`,
            }}
          >
            {piece.emoji}
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.div
        animate={{
          x: mousePos.x - 10,
          y: mousePos.y - 10,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
        className="w-5 h-5 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
          boxShadow: "0 0 20px rgba(168,85,247,0.2)",
        }}
      />
    </div>
  );
}
