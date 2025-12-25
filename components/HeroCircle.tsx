'use client'

import { motion } from 'framer-motion'

export default function HeroCircle() {
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer rotating ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#gradient1)"
            strokeWidth="0.5"
            strokeDasharray="4 4"
          />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#CCFF00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#CCFF00" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Middle pulsing ring */}
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-4"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="#CCFF00"
            strokeWidth="1"
            opacity="0.4"
          />
        </svg>
      </motion.div>

      {/* Inner core */}
      <div className="absolute inset-8 rounded-full bg-gradient-to-br from-neon-green/20 to-transparent backdrop-blur-sm flex items-center justify-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-24 h-24 rounded-full bg-neon-green/10 border border-neon-green/40"
        />
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 right-0 w-8 h-8">
        <div className="absolute top-0 right-0 w-full h-px bg-neon-green" />
        <div className="absolute top-0 right-0 w-px h-full bg-neon-green" />
      </div>
      <div className="absolute bottom-0 left-0 w-8 h-8">
        <div className="absolute bottom-0 left-0 w-full h-px bg-neon-green" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-neon-green" />
      </div>
    </div>
  )
}
