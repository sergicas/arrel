import React from 'react';
import { motion } from 'framer-motion';
// Assegura't de tenir el logo o fes servir un SVG en línia si no
// import Logo from '../assets/logo.png';

export default function BrandLoader({ text = 'Carregant...' }) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Logo Amb Pulsació */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="mb-8 relative"
      >
        {/* Placeholder Logo Arrel (Cercle Orgànic) */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" stroke="#33FF57" strokeWidth="2" strokeOpacity="0.3" />
          <circle cx="50" cy="50" r="35" stroke="#33FF57" strokeWidth="1" />
          <path d="M50 20V50L70 70" stroke="#33FF57" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Glow Effect */}
        <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full animate-pulse"></div>
      </motion.div>

      {/* Text de Càrrega */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-gray-400 font-mono text-sm tracking-widest uppercase"
      >
        {text}
      </motion.p>

      {/* Barra de Progrés Infinita */}
      <div className="mt-8 w-48 h-1 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-green-500"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    </div>
  );
}
