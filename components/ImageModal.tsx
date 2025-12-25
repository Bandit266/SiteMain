'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect } from 'react'
import DecryptText from './DecryptText'

interface Artwork {
  id: string
  title: string
  image: string
  faction: string
  description: string
  date: string
}

interface ImageModalProps {
  artwork: Artwork | null
  allArtworks: Artwork[]
  onClose: () => void
  onNavigate: (direction: 'prev' | 'next') => void
  factionColor: string
}

export default function ImageModal({ artwork, allArtworks, onClose, onNavigate, factionColor }: ImageModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate('prev')
      if (e.key === 'ArrowRight') onNavigate('next')
    }

    if (artwork) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [artwork, onClose, onNavigate])

  if (!artwork) return null

  const currentIndex = allArtworks.findIndex(a => a.id === artwork.id)
  const totalCount = allArtworks.length

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/95 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="relative w-full h-full max-w-7xl max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full animate-pulse"
                style={{ backgroundColor: factionColor }}
              />
              <DecryptText
                text={artwork.title}
                className="text-lg md:text-2xl font-bold text-crimson-bright code-font"
                as="h2"
                speed={30}
              />
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-crimson-bright transition-colors p-2"
            >
              <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Image Container */}
          <div className="relative flex-1 flex items-center justify-center">
            {/* Previous Button */}
            <button
              onClick={() => onNavigate('prev')}
              className="absolute left-0 md:left-4 z-10 p-2 md:p-4 bg-dark-card/80 border-2 border-crimson/40 hover:border-crimson hover:bg-crimson/20 transition-all group"
              aria-label="Previous image"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-crimson-bright group-hover:text-glow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
              className="relative w-full h-full max-w-5xl"
            >
              <div className="relative w-full h-full border-4 neon-border">
                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className="object-contain"
                  priority
                  quality={100}
                />

                {/* Glitch Effect Overlay */}
                <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-crimson/20 to-transparent animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Next Button */}
            <button
              onClick={() => onNavigate('next')}
              className="absolute right-0 md:right-4 z-10 p-2 md:p-4 bg-dark-card/80 border-2 border-crimson/40 hover:border-crimson hover:bg-crimson/20 transition-all group"
              aria-label="Next image"
            >
              <svg
                className="w-6 h-6 md:w-8 md:h-8 text-crimson-bright group-hover:text-glow"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Info Footer */}
          <div className="mt-4 px-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <DecryptText
                text={artwork.description}
                className="text-sm md:text-base text-gray-400 code-font"
                as="p"
                speed={20}
              />
              <span className="text-xs text-gray-600 code-font mt-1 block">{artwork.date}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs md:text-sm text-gray-500 code-font">
                {currentIndex + 1} / {totalCount}
              </span>
              <div className="flex gap-2">
                <div className="text-xs text-gray-600 code-font">
                  USE ← → KEYS
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
