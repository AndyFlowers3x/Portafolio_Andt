"use client";

import { useEffect, useState } from "react";

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonamiCode(callback: () => void) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === KONAMI_CODE[index]) {
        const newIndex = index + 1;
        if (newIndex === KONAMI_CODE.length) {
          callback();
          setIndex(0);
        } else {
          setIndex(newIndex);
        }
      } else {
        setIndex(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, callback]);
}

export default function KonamiCode() {
  const [isRainbowMode, setIsRainbowMode] = useState(false);

  useKonamiCode(() => {
    setIsRainbowMode(prev => !prev);
    if (!isRainbowMode) {
      showNotification();
    }
  });

  useEffect(() => {
    if (isRainbowMode) {
      document.body.style.animation = 'rainbow 3s linear infinite';
    } else {
      document.body.style.animation = '';
    }
    
    return () => {
      document.body.style.animation = '';
    };
  }, [isRainbowMode]);

  const showNotification = () => {
    const notification = document.createElement('div');
    notification.className = 'fixed top-20 right-4 z-50 px-6 py-3 bg-linear-to-r from-red-500 via-yellow-500 to-green-500 text-white font-bold rounded-lg shadow-lg';
    notification.textContent = '🌈 MODO ARCOÍRIS ACTIVADO! 🌈';
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  return null;
}
