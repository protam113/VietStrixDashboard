'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [squares, setSquares] = useState([
    { id: 1, x: 0, y: 0, visible: true },
    { id: 2, x: 1, y: 0, visible: true },
    { id: 3, x: 2, y: 0, visible: true },
    { id: 4, x: 0, y: 1, visible: true },
    { id: 5, x: 1, y: 1, visible: true },
    { id: 6, x: 2, y: 1, visible: true },
    { id: 7, x: 0, y: 2, visible: true },
    { id: 8, x: 1, y: 2, visible: true },
    { id: 9, x: 2, y: 2, visible: true },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly hide/show squares to create shuffle effect
      setSquares((prev) => {
        return prev.map((square) => {
          // Always keep at least 4 squares visible
          const visibleCount = prev.filter((s) => s.visible).length;
          if (visibleCount <= 4 && square.visible) {
            return square;
          }

          return {
            ...square,
            visible: Math.random() > 0.3, // 70% chance to be visible
          };
        });
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#013162] text-white">
      {/* <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wider">Team Vietstrix</h1>
      </div> */}

      <div className="relative w-24 h-24">
        <div className="grid grid-cols-3 grid-rows-3 gap-1">
          {squares.map((square) => (
            <motion.div
              key={square.id}
              initial={{ opacity: 1 }}
              animate={{
                opacity: square.visible ? 1 : 0,
                scale: square.visible ? 1 : 0.8,
              }}
              transition={{ duration: 0.2 }}
              className="w-7 h-7 bg-white"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
