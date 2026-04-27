"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 18;
const INITIAL_SPEED = 600;

const TETROMINOS = [
  { shape: [[1,1,1,1]], color: "#06b6d4" }, // I
  { shape: [[1,1],[1,1]], color: "#f59e0b" }, // O
  { shape: [[0,1,0],[1,1,1]], color: "#a855f7" }, // T
  { shape: [[0,1,1],[1,1,0]], color: "#10b981" }, // S
  { shape: [[1,1,0],[0,1,1]], color: "#ef4444" }, // Z
  { shape: [[1,0,0],[1,1,1]], color: "#3b82f6" }, // L
  { shape: [[0,0,1],[1,1,1]], color: "#ec4899" }, // J
];

export default function MiniTetrisGame() {
  const [board, setBoard] = useState(() => 
    Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0))
  );
  const [isGameActive, setIsGameActive] = useState(false);
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    x: number;
    y: number;
  } | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [skills, setSkills] = useState({
    slowTime: { active: false, cooldown: 0, duration: 5000 },
    clearLine: { active: false, cooldown: 0, uses: 2 },
    ghostPiece: { active: false, cooldown: 0, duration: 3000 },
    bomb: { active: false, cooldown: 0, uses: 1 }
  });
  const [combo, setCombo] = useState(0);
  const [level, setLevel] = useState(1);

  const createNewPiece = useCallback(() => {
    const tetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
    return {
      shape: tetromino.shape,
      color: tetromino.color,
      x: Math.floor((BOARD_WIDTH - tetromino.shape[0].length) / 2),
      y: 0,
    };
  }, []);

  const checkCollision = useCallback((piece: typeof currentPiece, board: number[][]) => {
    if (!piece) return false;
    
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const newY = piece.y + y;
          const newX = piece.x + x;
          
          if (newX < 0 || newX >= BOARD_WIDTH || newY >= BOARD_HEIGHT) {
            return true;
          }
          
          if (newY >= 0 && board[newY][newX]) {
            return true;
          }
        }
      }
    }
    return false;
  }, []);

  const mergePiece = useCallback((piece: typeof currentPiece, board: number[][]) => {
    if (!piece) return board;
    
    const newBoard = board.map(row => [...row]);
    for (let y = 0; y < piece.shape.length; y++) {
      for (let x = 0; x < piece.shape[y].length; x++) {
        if (piece.shape[y][x]) {
          const boardY = piece.y + y;
          const boardX = piece.x + x;
          if (boardY >= 0) {
            newBoard[boardY][boardX] = 1;
          }
        }
      }
    }
    return newBoard;
  }, []);

  const clearLines = useCallback((board: number[][]) => {
    let linesCleared = 0;
    const newBoard = board.filter(row => {
      if (row.every(cell => cell)) {
        linesCleared++;
        return false;
      }
      return true;
    });
    
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(0));
    }
    
    if (linesCleared > 0) {
      const comboMultiplier = Math.max(1, combo);
      const points = linesCleared * 100 * comboMultiplier * level;
      setScore(prev => prev + points);
      setCombo(prev => prev + 1);
      
      // Level up every 500 points
      if ((score + points) >= level * 500) {
        setLevel(prev => prev + 1);
      }
    } else {
      setCombo(0);
    }
    
    return newBoard;
  }, [combo, level, score]);

  const activateSkill = useCallback((skillName: keyof typeof skills) => {
    if (gameOver || isPaused) return;
    
    setSkills(prev => {
      const skill = prev[skillName];
      if (skill.cooldown > 0) return prev;
      if ('uses' in skill && skill.uses <= 0) return prev;
      
      switch(skillName) {
        case 'slowTime':
          return {
            ...prev,
            slowTime: { active: true, cooldown: 15000, duration: 5000 }
          };
        case 'clearLine':
          setBoard(currentBoard => {
            // Encontrar la línea más llena para limpiarla
            let targetRow = BOARD_HEIGHT - 1;
            let maxCells = -1;
            
            for (let y = BOARD_HEIGHT - 1; y >= 0; y--) {
              const count = currentBoard[y].filter(cell => cell).length;
              if (count > maxCells) {
                maxCells = count;
                targetRow = y;
              }
            }

            const newBoard = currentBoard.filter((_, index) => index !== targetRow);
            newBoard.unshift(Array(BOARD_WIDTH).fill(0));
            setScore(prev => prev + 50);
            return newBoard;
          });
          return {
            ...prev,
            clearLine: { active: false, cooldown: 10000, uses: 'uses' in skill ? (skill as any).uses - 1 : 2 }
          };
        case 'ghostPiece':
          return {
            ...prev,
            ghostPiece: { active: true, cooldown: 12000, duration: 3000 }
          };
        case 'bomb':
          setBoard(currentBoard => {
            // Eliminar los bloques de la mitad inferior aleatoriamente (limpieza masiva)
            const newBoard = currentBoard.map((row, y) => {
              if (y > BOARD_HEIGHT / 2) {
                return row.map(cell => Math.random() > 0.4 ? 0 : cell);
              }
              return row;
            });
            setScore(prev => prev + 100);
            return newBoard;
          });
          return {
            ...prev,
            bomb: { active: false, cooldown: 20000, uses: 'uses' in skill ? (skill as any).uses - 1 : 1 }
          };
        default:
          return prev;
      }
    });
  }, [gameOver, isPaused]);

  const movePiece = useCallback((dx: number, dy: number) => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const newPiece = {
      ...currentPiece,
      x: currentPiece.x + dx,
      y: currentPiece.y + dy,
    };
    
    if (!checkCollision(newPiece, board)) {
      setCurrentPiece(newPiece);
    } else if (dy > 0) {
      const mergedBoard = mergePiece(currentPiece, board);
      const clearedBoard = clearLines(mergedBoard);
      setBoard(clearedBoard);
      
      const newPiece = createNewPiece();
      if (checkCollision(newPiece, clearedBoard)) {
        setGameOver(true);
      } else {
        setCurrentPiece(newPiece);
      }
    }
  }, [currentPiece, board, gameOver, isPaused, checkCollision, mergePiece, clearLines, createNewPiece]);

  const rotatePiece = useCallback(() => {
    if (!currentPiece || gameOver || isPaused) return;
    
    const rotated = {
      ...currentPiece,
      shape: currentPiece.shape[0].map((_, i) =>
        currentPiece.shape.map(row => row[i]).reverse()
      ),
    };
    
    if (!checkCollision(rotated, board)) {
      setCurrentPiece(rotated);
    }
  }, [currentPiece, board, gameOver, isPaused, checkCollision]);

  const resetGame = useCallback(() => {
    setBoard(Array(BOARD_HEIGHT).fill(null).map(() => Array(BOARD_WIDTH).fill(0)));
    setCurrentPiece(createNewPiece());
    setScore(0);
    setGameOver(false);
    setIsPaused(false);
    setIsGameActive(false);
  }, [createNewPiece]);

  const exitGame = useCallback(() => {
    setIsGameActive(false);
    setGameOver(true);
    // Forzar restauración del scroll inmediatamente
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
  }, []);

  useEffect(() => {
    if (!currentPiece && !gameOver) {
      setCurrentPiece(createNewPiece());
      setIsGameActive(true);
    }
  }, [currentPiece, gameOver, createNewPiece]);

  
  useEffect(() => {
    if (gameOver || isPaused) return;
    
    // Calcular velocidad base con modificadores
    const baseSpeed = Math.max(100, INITIAL_SPEED - (level - 1) * 50);
    const slowTimeMultiplier = skills.slowTime.active ? 2 : 1;
    const finalSpeed = baseSpeed * slowTimeMultiplier;
    
    const interval = setInterval(() => {
      movePiece(0, 1);
    }, finalSpeed);
    
    return () => clearInterval(interval);
  }, [movePiece, gameOver, isPaused, level, skills.slowTime.active]);

  // Manejar cooldowns de habilidades
  useEffect(() => {
    if (gameOver || isPaused) return;
    
    const interval = setInterval(() => {
      setSkills(prev => {
        return {
          slowTime: {
            active: prev.slowTime.active,
            cooldown: Math.max(0, prev.slowTime.cooldown - 100),
            duration: prev.slowTime.duration
          },
          clearLine: {
            active: prev.clearLine.active,
            cooldown: Math.max(0, prev.clearLine.cooldown - 100),
            uses: prev.clearLine.uses
          },
          ghostPiece: {
            active: prev.ghostPiece.active,
            cooldown: Math.max(0, prev.ghostPiece.cooldown - 100),
            duration: prev.ghostPiece.duration
          },
          bomb: {
            active: prev.bomb.active,
            cooldown: Math.max(0, prev.bomb.cooldown - 100),
            uses: prev.bomb.uses
          }
        };
      });
    }, 100);
    
    return () => clearInterval(interval);
  }, [gameOver, isPaused]);

  // Manejar duración de habilidades temporales
  useEffect(() => {
    if (skills.slowTime.active) {
      const timer = setTimeout(() => {
        setSkills(prev => ({
          ...prev,
          slowTime: { ...prev.slowTime, active: false }
        }));
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [skills.slowTime.active]);

  useEffect(() => {
    if (skills.ghostPiece.active) {
      const timer = setTimeout(() => {
        setSkills(prev => ({
          ...prev,
          ghostPiece: { ...prev.ghostPiece, active: false }
        }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [skills.ghostPiece.active]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;
      
      switch(e.key) {
        case 'z':
        case 'Z':
          movePiece(-1, 0);
          break;
        case 'c':
        case 'C':
          movePiece(1, 0);
          break;
        case 'ArrowDown':
          movePiece(0, 1);
          break;
        case 'x':
        case 'X':
          // Hard drop - caída rápida hasta el fondo
          if (currentPiece && !gameOver && !isPaused) {
            let dropDistance = 0;
            while (!checkCollision({ ...currentPiece, y: currentPiece.y + dropDistance + 1 }, board)) {
              dropDistance++;
            }
            if (dropDistance > 0) {
              movePiece(0, dropDistance);
            }
          }
          break;
        case 'o':
        case 'O':
          rotatePiece();
          break;
        case 'p':
        case 'P':
          setIsPaused(prev => !prev);
          break;
        case 'q':
        case 'Q':
          activateSkill('slowTime');
          break;
        case 'w':
        case 'W':
          activateSkill('clearLine');
          break;
        case 'e':
        case 'E':
          activateSkill('ghostPiece');
          break;
        case 'r':
        case 'R':
          activateSkill('bomb');
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [movePiece, rotatePiece, gameOver]);

  return (
    <div id="tetris-game" className="flex flex-col items-center gap-4 max-w-lg">
      <div className="text-center">
        <h3 className="text-xl font-bold text-neon-purple mb-2">Tetris Battle</h3>
        <div className="flex gap-3 justify-center text-sm text-foreground/70 mb-3">
          <span className="px-2 py-1 bg-surface rounded">Level {level}</span>
          <span className="px-2 py-1 bg-surface rounded">x{combo} Combo</span>
          <span className="px-2 py-1 bg-neon-purple/20 text-neon-purple rounded">{score.toLocaleString()} pts</span>
        </div>
        <button
          onClick={exitGame}
          className="px-3 py-1 text-xs bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors"
        >
          🚪 Salir del Juego
        </button>
      </div>
      
      <div className="flex gap-4 items-start">
        {/* Tablero de juego más grande */}
        <div className="relative">
          <div className="grid grid-cols-10 gap-px bg-surface p-2 rounded-lg border-2 border-border-color shadow-lg">
            {board.map((row, y) =>
              row.map((cell, x) => {
                const isCurrentPiece = currentPiece && currentPiece.shape.some((py, dy) =>
                  currentPiece.shape[dy]?.some((px, dx) =>
                    px && currentPiece.y + dy === y && currentPiece.x + dx === x
                  )
                );
                
                const isGhostPiece = skills.ghostPiece.active && currentPiece && !isCurrentPiece;
                let ghostY = 0;
                if (isGhostPiece && currentPiece) {
                  ghostY = currentPiece.y;
                  while (ghostY < BOARD_HEIGHT - 1) {
                    const testPiece = { ...currentPiece, y: ghostY + 1 };
                    if (checkCollision(testPiece, board)) break;
                    ghostY++;
                  }
                }
                const isGhostPosition = isGhostPiece && currentPiece && 
                  currentPiece.shape.some((py, dy) =>
                    currentPiece.shape[dy]?.some((px, dx) =>
                      px && ghostY + dy === y && currentPiece.x + dx === x
                    )
                  );
                
                return (
                  <motion.div
                    key={`${y}-${x}`}
                    className={`w-4 h-4 rounded-sm transition-all duration-150 ${
                      cell || isCurrentPiece 
                        ? "shadow-md" 
                        : "bg-surface-light/20"
                    }`}
                    style={{
                      backgroundColor: isCurrentPiece ? currentPiece?.color : 
                                     isGhostPosition ? `${currentPiece?.color}40` :
                                     cell ? "#a855f7" : undefined,
                      boxShadow: (cell || isCurrentPiece) ? `0 0 8px ${currentPiece?.color || "#a855f7"}50` : undefined,
                      opacity: isGhostPosition ? 0.6 : 1,
                      transform: isCurrentPiece ? "scale(1.1)" : "scale(1)"
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.1 }}
                  />
                );
              })
            )}
          </div>
          
          <AnimatePresence>
            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 rounded-lg flex items-center justify-center backdrop-blur-sm"
              >
                <div className="text-center p-2">
                  <p className="text-lg font-bold text-neon-purple mb-1">Game Over!</p>
                  <p className="text-sm text-foreground mb-2">Score: {score}</p>
                  <button
                    onClick={resetGame}
                    className="px-3 py-1 bg-neon-purple text-white text-xs rounded-lg hover:bg-neon-purple/80 transition-colors"
                  >
                    Reintentar
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {isPaused && !gameOver && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 rounded-lg flex items-center justify-center backdrop-blur-sm"
            >
              <p className="text-lg font-bold text-neon-cyan">PAUSA</p>
            </motion.div>
          )}
        </div>

        {/* Panel de habilidades más grande */}
        <div className="flex flex-col gap-2 bg-surface/50 p-3 rounded-lg border border-border-color">
          <div className="text-sm font-semibold text-foreground/80 mb-2">Habilidades Especiales</div>
          
          <button
            onClick={() => activateSkill('slowTime')}
            disabled={skills.slowTime.cooldown > 0}
            className={`relative px-3 py-2 text-sm rounded-lg transition-all font-medium ${
              skills.slowTime.active 
                ? 'bg-blue-500 text-white animate-pulse shadow-lg shadow-blue-500/30' 
                : skills.slowTime.cooldown > 0 
                ? 'bg-surface text-foreground/30 cursor-not-allowed'
                : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">⏱️</span>
              <div className="text-left">
                <div>Slow Time</div>
                {skills.slowTime.cooldown > 0 && (
                  <div className="text-xs opacity-70">{Math.ceil(skills.slowTime.cooldown/1000)}s</div>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => activateSkill('clearLine')}
            disabled={skills.clearLine.cooldown > 0 || (skills.clearLine as any).uses <= 0}
            className={`relative px-3 py-2 text-sm rounded-lg transition-all font-medium ${
              skills.clearLine.cooldown > 0 || (skills.clearLine as any).uses <= 0
                ? 'bg-surface text-foreground/30 cursor-not-allowed'
                : 'bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">🧹</span>
              <div className="text-left">
                <div>Clear Line</div>
                <div className="text-xs opacity-70">{(skills.clearLine as any).uses} uses</div>
                {skills.clearLine.cooldown > 0 && (
                  <div className="text-xs">{Math.ceil(skills.clearLine.cooldown/1000)}s</div>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => activateSkill('ghostPiece')}
            disabled={skills.ghostPiece.cooldown > 0}
            className={`relative px-3 py-2 text-sm rounded-lg transition-all font-medium ${
              skills.ghostPiece.active 
                ? 'bg-purple-500 text-white animate-pulse shadow-lg shadow-purple-500/30' 
                : skills.ghostPiece.cooldown > 0 
                ? 'bg-surface text-foreground/30 cursor-not-allowed'
                : 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">👻</span>
              <div className="text-left">
                <div>Ghost Piece</div>
                {skills.ghostPiece.cooldown > 0 && (
                  <div className="text-xs opacity-70">{Math.ceil(skills.ghostPiece.cooldown/1000)}s</div>
                )}
              </div>
            </div>
          </button>

          <button
            onClick={() => activateSkill('bomb')}
            disabled={skills.bomb.cooldown > 0 || (skills.bomb as any).uses <= 0}
            className={`relative px-3 py-2 text-sm rounded-lg transition-all font-medium ${
              skills.bomb.cooldown > 0 || (skills.bomb as any).uses <= 0
                ? 'bg-surface text-foreground/30 cursor-not-allowed'
                : 'bg-red-500/20 text-red-400 hover:bg-red-500/30 hover:shadow-md'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">💣</span>
              <div className="text-left">
                <div>Bomb</div>
                <div className="text-xs opacity-70">{(skills.bomb as any).uses} uses</div>
                {skills.bomb.cooldown > 0 && (
                  <div className="text-xs">{Math.ceil(skills.bomb.cooldown/1000)}s</div>
                )}
              </div>
            </div>
          </button>
        </div>
      </div>
      
      <div className="text-center bg-surface/50 p-3 rounded-lg border border-border-color">
        <div className="text-sm font-medium text-foreground/70 mb-2">
          Controles
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-foreground/60">
          <div>⬅️ Z: Izquierda</div>
          <div>➡️ C: Derecha</div>
          <div>⬇️ ↓: Abajo (lento)</div>
          <div>⚡ X: Caída rápida</div>
          <div>🔄 O: Rotar</div>
          <div>⏸️ P: Pausar</div>
          <div>⚡ Q/W/E/R: Habilidades</div>
        </div>
      </div>
    </div>
  );
}
