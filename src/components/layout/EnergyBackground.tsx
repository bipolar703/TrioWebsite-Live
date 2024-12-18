import React from 'react';
import { motion } from 'framer-motion';

export default function EnergyBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 animate-gradient" />
      
      {/* Energy Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary/20 rounded-full energy-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>
      
      {/* Energy Waves */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 h-[1px] energy-wave"
            style={{
              top: `${30 + i * 20}%`,
              animationDelay: `${i * 0.5}s`,
              background: `linear-gradient(90deg, 
                transparent 0%, 
                ${i % 2 === 0 ? 'rgba(12, 120, 189, 0.15)' : 'rgba(234, 122, 35, 0.15)'} 50%,
                transparent 100%
              )`
            }}
          />
        ))}
      </div>
    </div>
  );
} 