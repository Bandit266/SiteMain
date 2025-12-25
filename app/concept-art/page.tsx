'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import conceptArtData from '@/data/concept-art.json'
import DecryptText from '@/components/DecryptText'

interface Artwork {
  id: string
  title: string
  image: string
  faction: string
  description: string
  date: string
}

type Direction = 'north' | 'south' | 'east' | 'west' | 'back'

type Tilt = {
  x: number
  y: number
}

const cardVariants = {
  enter: (direction: Direction) => {
    const offset = 220
    switch (direction) {
      case 'north':
        return { x: 0, y: -offset, opacity: 0, scale: 0.96, rotate: -2 }
      case 'south':
        return { x: 0, y: offset, opacity: 0, scale: 0.96, rotate: 2 }
      case 'west':
        return { x: -offset, y: 0, opacity: 0, scale: 0.96, rotate: -3 }
      case 'east':
        return { x: offset, y: 0, opacity: 0, scale: 0.96, rotate: 3 }
      default:
        return { x: 0, y: 40, opacity: 0, scale: 0.95 }
    }
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
  },
  exit: (direction: Direction) => {
    const offset = 260
    switch (direction) {
      case 'north':
        return { x: 0, y: offset, opacity: 0, scale: 0.94, rotate: 4 }
      case 'south':
        return { x: 0, y: -offset, opacity: 0, scale: 0.94, rotate: -4 }
      case 'west':
        return { x: offset, y: 0, opacity: 0, scale: 0.94, rotate: 5 }
      case 'east':
        return { x: -offset, y: 0, opacity: 0, scale: 0.94, rotate: -5 }
      default:
        return { x: 0, y: -30, opacity: 0, scale: 0.94 }
    }
  }
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max)

const getDirection = (x: number, y: number) => {
  const absX = Math.abs(x)
  const absY = Math.abs(y)
  if (absX < 0.2 && absY < 0.2) return null
  if (absX >= absY) {
    return x > 0 ? 'east' : 'west'
  }
  return y > 0 ? 'south' : 'north'
}

export default function ConceptArt() {
  const artworks = conceptArtData.artworks as Artwork[]
  const factions = conceptArtData.factions
  const initialArtwork = artworks[0]

  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(initialArtwork || null)
  const [historyStack, setHistoryStack] = useState<Artwork[]>([])
  const [recentIds, setRecentIds] = useState<string[]>(initialArtwork ? [initialArtwork.id] : [])
  const [direction, setDirection] = useState<Direction>('east')
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 })
  const [hoverDirection, setHoverDirection] = useState<Direction | null>(null)
  const [hoverStrength, setHoverStrength] = useState(0)
  const [activeTab, setActiveTab] = useState<'gallery' | 'trace'>('gallery')

  if (!currentArtwork) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-gray-500 code-font">NO.CONCEPTS.FOUND</p>
      </div>
    )
  }

  const factionColor =
    factions[currentArtwork.faction as keyof typeof factions]?.color || '#c41e3a'

  const pickNextArtwork = (currentId: string) => {
    const blocked = new Set(recentIds)
    blocked.add(currentId)

    const candidates = artworks.filter((art) => !blocked.has(art.id))
    const pool = candidates.length > 0
      ? candidates
      : artworks.filter((art) => art.id !== currentId)

    return pool[Math.floor(Math.random() * pool.length)] || currentArtwork
  }

  const handleMove = (nextDirection: Direction) => {
    const nextArtwork = pickNextArtwork(currentArtwork.id)
    if (!nextArtwork || nextArtwork.id === currentArtwork.id) return

    setDirection(nextDirection)
    setHistoryStack((prev) => [currentArtwork, ...prev].slice(0, 20))
    setCurrentArtwork(nextArtwork)
    setRecentIds((prev) => {
      const nextList = [nextArtwork.id, ...prev.filter((id) => id !== nextArtwork.id)]
      return nextList.slice(0, 20)
    })
  }

  const handleBackTo = (index: number) => {
    const previous = historyStack[index]
    if (!previous) return
    const remaining = historyStack.slice(index + 1)

    setDirection('back')
    setHistoryStack(remaining)
    setCurrentArtwork(previous)
    setRecentIds((prev) => {
      const nextList = [previous.id, ...prev.filter((id) => id !== previous.id)]
      return nextList.slice(0, 20)
    })
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    const clampedX = clamp(x, -1, 1)
    const clampedY = clamp(y, -1, 1)

    setTilt({ x: clampedX * 6, y: clampedY * -6 })

    const intensity = clamp(Math.max(Math.abs(clampedX), Math.abs(clampedY)), 0, 1)
    setHoverStrength(intensity)
    setHoverDirection(getDirection(clampedX, clampedY))
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHoverStrength(0)
    setHoverDirection(null)
  }

  const handleCardClick = () => {
    if (!hoverDirection || hoverStrength < 0.45) return
    handleMove(hoverDirection)
  }

  const handleDrag = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset
    setTilt({ x: clamp(x / 30, -8, 8), y: clamp(-y / 30, -8, 8) })
    const normX = clamp(x / 200, -1, 1)
    const normY = clamp(y / 200, -1, 1)
    setHoverStrength(clamp(Math.max(Math.abs(normX), Math.abs(normY)), 0, 1))
    setHoverDirection(getDirection(normX, normY))
  }

  const handleDragEnd = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset
    const threshold = 120
    if (Math.abs(x) < threshold && Math.abs(y) < threshold) {
      setTilt({ x: 0, y: 0 })
      setHoverStrength(0)
      setHoverDirection(null)
      return
    }

    if (Math.abs(x) >= Math.abs(y)) {
      handleMove(x > 0 ? 'east' : 'west')
    } else {
      handleMove(y > 0 ? 'south' : 'north')
    }

    setTilt({ x: 0, y: 0 })
    setHoverStrength(0)
    setHoverDirection(null)
  }

  const glowAlpha = clamp(0.08 + hoverStrength * 0.25, 0, 0.3)
  const glowMap: Record<Direction, string> = {
    north: `radial-gradient(circle at 50% 0%, rgba(230,57,70,${glowAlpha}), transparent 65%)`,
    south: `radial-gradient(circle at 50% 100%, rgba(230,57,70,${glowAlpha}), transparent 65%)`,
    east: `radial-gradient(circle at 100% 50%, rgba(230,57,70,${glowAlpha}), transparent 65%)`,
    west: `radial-gradient(circle at 0% 50%, rgba(230,57,70,${glowAlpha}), transparent 65%)`,
    back: 'transparent',
  }

  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      <section className="relative h-[calc(100vh-4rem)] px-4 py-4 md:py-6">
        <div className="max-w-6xl mx-auto h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 code-font">
              <DecryptText
                text=">>>_CONCEPT.ARCHIVE"
                className="text-crimson-bright text-glow inline-block"
                as="span"
                speed={40}
              />
            </h1>
            <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto code-font">
              <DecryptText
                text="swipe.drag.or-lean.then-click.for-next-frame"
                as="span"
                speed={25}
              />
            </p>
            <div className="w-24 h-1 bg-crimson-bright mx-auto mt-6" />
          </motion.div>

          <div className="flex justify-center mb-4">
            <div className="inline-flex gap-2 border border-crimson/20 bg-[#0b0f14] p-1 code-font text-xs">
              {[
                { id: 'gallery', label: 'GALLERY' },
                { id: 'trace', label: 'TRACE.LOG' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'gallery' | 'trace')}
                  className={`px-3 py-1 tracking-wider transition-all ${
                    activeTab === tab.id
                      ? 'bg-crimson/30 text-crimson-bright'
                      : 'text-gray-500 hover:text-crimson-bright'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 min-h-0">
            {activeTab === 'gallery' ? (
              <div className="h-full flex flex-col items-center justify-center gap-4">
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentArtwork.id}
                      custom={direction}
                      variants={cardVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative"
                    >
                      <motion.div
                        drag
                        dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                        dragElastic={0.18}
                        onDrag={handleDrag}
                        onDragEnd={handleDragEnd}
                        onPointerMove={handlePointerMove}
                        onPointerLeave={handlePointerLeave}
                        onClick={handleCardClick}
                        style={{
                          rotateX: tilt.y,
                          rotateY: tilt.x,
                          transformStyle: 'preserve-3d',
                        }}
                        className="relative aspect-[3/4] w-full cursor-grab active:cursor-grabbing"
                      >
                        <div
                          className="relative h-full w-full overflow-hidden border border-crimson/20 bg-[#0b0f14]"
                          style={{ boxShadow: `0 0 16px ${factionColor}22` }}
                        >
                          <div className="absolute inset-0" style={{ background: hoverDirection ? glowMap[hoverDirection] : 'transparent' }} />
                          <Image
                            src={currentArtwork.image}
                            alt={currentArtwork.title}
                            fill
                            className="object-cover"
                            priority
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs code-font text-gray-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: factionColor }} />
                            <span>{currentArtwork.faction.toUpperCase()}</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                            <DecryptText
                              text={currentArtwork.title}
                              className="text-base md:text-lg font-bold text-crimson-bright mb-2 code-font"
                              as="h2"
                              speed={30}
                            />
                            <DecryptText
                              text={currentArtwork.description}
                              className="text-xs text-gray-400 code-font"
                              as="p"
                              speed={20}
                            />
                            <div className="mt-3 flex items-center justify-between text-[10px] text-gray-600 code-font">
                              <span>DATE: {currentArtwork.date}</span>
                              <span>HISTORY: {historyStack.length}/20</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="border border-crimson/20 bg-[#0b0f14] px-4 py-2 text-[10px] code-font text-gray-500">
                  INPUT: SWIPE / DRAG / LEAN + CLICK
                </div>
              </div>
            ) : (
              <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-crimson/20 bg-[#0b0f14] p-4">
                  <div className="text-xs text-gray-500 code-font mb-3">RECENT.PATH</div>
                  <div className="space-y-3">
                    {historyStack.slice(0, 6).map((art, index) => (
                      <button
                        key={art.id}
                        type="button"
                        onClick={() => handleBackTo(index)}
                        className="flex items-center gap-3 w-full text-left group"
                      >
                        <div className="relative w-12 h-12 overflow-hidden border border-crimson/20">
                          <Image
                            src={art.image}
                            alt={art.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-300 code-font group-hover:text-crimson-bright transition-colors">
                            {art.title}
                          </div>
                          <div className="text-[10px] text-gray-500 code-font">BACKTRACK</div>
                        </div>
                      </button>
                    ))}
                    {historyStack.length === 0 && (
                      <div className="text-xs text-gray-600 code-font">NO.BACK.CARDS</div>
                    )}
                  </div>
                </div>

                <div className="border border-crimson/20 bg-[#0b0f14] p-4 text-xs code-font text-gray-500 space-y-3">
                  <div>INPUT: SWIPE / DRAG / LEAN + CLICK</div>
                  <div>DISCARD VECTOR: DIRECTIONAL THROW</div>
                  <div>DEDUP CACHE: 20 FRAMES</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
