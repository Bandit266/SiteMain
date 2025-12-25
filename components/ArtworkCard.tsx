'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import DecryptText from './DecryptText'

interface Artwork {
  id: string
  title: string
  image: string
  faction: string
  description: string
  date: string
}

interface ArtworkCardProps {
  artwork: Artwork
  onClick: () => void
  factionColor: string
  index: number
}

export default function ArtworkCard({ artwork, onClick, factionColor, index }: ArtworkCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setMousePosition({ x: rotateY, y: rotateX })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.5 }}
      className="group cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        animate={{
          rotateX: mousePosition.y,
          rotateY: mousePosition.x,
          z: isHovered ? 50 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Glow Effect Underneath */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3 }}
          className="absolute -inset-4 rounded-lg blur-xl"
          style={{
            background: `radial-gradient(circle at center, ${factionColor}40, transparent 70%)`,
            zIndex: -1,
          }}
        />

        {/* Card Container */}
        <div className="relative overflow-hidden bg-dark-card border-2 border-crimson/30 hover:border-crimson transition-all duration-300">
          {/* Image */}
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              quality={90}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

            {/* Glitch Effect on Hover */}
            {isHovered && (
              <>
                <motion.div
                  animate={{
                    x: [0, -5, 5, -5, 0],
                    opacity: [0, 0.5, 0.5, 0.5, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className="absolute inset-0 bg-crimson/20 mix-blend-screen"
                />
                <motion.div
                  animate={{
                    x: [0, 5, -5, 5, 0],
                    opacity: [0, 0.3, 0.3, 0.3, 0],
                  }}
                  transition={{
                    duration: 0.3,
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    repeatDelay: 2,
                    delay: 0.1,
                  }}
                  className="absolute inset-0 bg-crimson-bright/20 mix-blend-screen"
                />
              </>
            )}

            {/* Faction Indicator */}
            <div
              className="absolute top-3 right-3 w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: factionColor, boxShadow: `0 0 10px ${factionColor}` }}
            />

            {/* Scan Line Effect */}
            <motion.div
              animate={{
                top: isHovered ? ['0%', '100%'] : '0%',
              }}
              transition={{
                duration: 1.5,
                repeat: isHovered ? Infinity : 0,
                ease: 'linear',
              }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-crimson-bright to-transparent opacity-50"
            />
          </div>

          {/* Info Section */}
          <div className="p-4">
            <DecryptText
              text={artwork.title}
              className="text-sm md:text-base font-bold text-crimson-bright mb-2 code-font line-clamp-1"
              as="h3"
              speed={35}
            />
            <DecryptText
              text={artwork.description}
              className="text-xs text-gray-400 code-font line-clamp-2"
              as="p"
              speed={25}
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-600 code-font">{artwork.date}</span>
              <motion.div
                animate={{
                  x: isHovered ? 5 : 0,
                }}
                className="text-crimson-bright"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Corner Accent */}
          <div
            className="absolute bottom-0 right-0 w-16 h-16 opacity-20"
            style={{
              background: `linear-gradient(135deg, transparent 50%, ${factionColor} 50%)`,
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
