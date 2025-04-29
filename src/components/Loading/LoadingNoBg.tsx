'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function RadiatingLoaderNoBg() {
  const [pulses, setPulses] = useState<number[]>([]);

  // Create new pulses at regular intervals
  useEffect(() => {
    const interval = setInterval(() => {
      setPulses((prev) => {
        // Add a new pulse and remove old ones if there are more than 3
        const newPulses = [...prev, Date.now()];
        if (newPulses.length > 3) {
          return newPulses.slice(newPulses.length - 3);
        }
        return newPulses;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="relative flex items-center justify-center">
        {/* Static center circle */}
        <div className="w-24 h-24 bg-lime-600 rounded-full z-10" />

        {/* Radiating pulses */}
        {pulses.map((id) => (
          <motion.div
            key={id}
            className="absolute rounded-full bg-lime-400 opacity-70"
            initial={{ width: '6rem', height: '6rem', opacity: 0.8 }}
            animate={{
              width: '12rem',
              height: '12rem',
              opacity: 0,
            }}
            transition={{
              duration: 2.5,
              ease: 'easeOut',
            }}
          />
        ))}

        {/* Static outer ring */}
        <div className="absolute w-32 h-32 bg-green-200 rounded-full opacity-50 z-0" />
      </div>
    </div>
  );
}
