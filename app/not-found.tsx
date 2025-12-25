'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center px-4">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-9xl font-bold text-neon-green text-glow mb-4">404</h1>
          <div className="w-32 h-1 bg-neon-green mx-auto mb-8" />
          <h2 className="text-3xl font-bold text-white mb-4">PAGE NOT FOUND</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            The page you're looking for has been moved to another dimension.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-4 bg-neon-green text-black font-semibold tracking-wider hover:bg-neon-green/90 transition-all hover:shadow-lg hover:shadow-neon-green/50"
          >
            RETURN HOME
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
