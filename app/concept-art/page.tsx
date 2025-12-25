'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import conceptArtData from '@/data/concept-art.json'
import DecryptText from '@/components/DecryptText'
import GlitchText from '@/components/GlitchText'

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
  const maxStackSize = Math.min(3, artworks.length)

  const pickNextArtwork = (blockedIds: Set<string>, fallbackId?: string) => {
    const candidates = artworks.filter((art) => !blockedIds.has(art.id))
    if (candidates.length > 0) {
      return candidates[Math.floor(Math.random() * candidates.length)]
    }
    const fallback = artworks.filter((art) => art.id !== fallbackId)
    if (fallback.length > 0) {
      return fallback[Math.floor(Math.random() * fallback.length)]
    }
    return artworks[0] || null
  }

  const buildStack = (primary: Artwork, blockedIds = new Set<string>()) => {
    if (maxStackSize <= 1) {
      return [primary]
    }
    const stack = [primary]
    const used = new Set(blockedIds)
    used.add(primary.id)

    while (stack.length < maxStackSize) {
      const next = pickNextArtwork(used, primary.id)
      if (!next || used.has(next.id)) {
        break
      }
      stack.push(next)
      used.add(next.id)
    }

    return stack.slice(0, maxStackSize)
  }

  const initialStack = initialArtwork ? buildStack(initialArtwork) : []

  const [cardStack, setCardStack] = useState<Artwork[]>(initialStack)
  const [historyStack, setHistoryStack] = useState<Artwork[]>([])
  const [recentIds, setRecentIds] = useState<string[]>(initialStack.map((art) => art.id))
  const [direction, setDirection] = useState<Direction>('east')
  const [tilt, setTilt] = useState<Tilt>({ x: 0, y: 0 })
  const [hoverDirection, setHoverDirection] = useState<Direction | null>(null)
  const [hoverStrength, setHoverStrength] = useState(0)
  const [activeTab, setActiveTab] = useState<'gallery' | 'trace'>('gallery')
  const [hoverDuration, setHoverDuration] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [canClick, setCanClick] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  const [fullscreenImage, setFullscreenImage] = useState<Artwork | null>(null)

  const currentArtwork = cardStack[0] ?? null

  // Cyber decay timer - tracks how long user hovers on image
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isHovering) {
      interval = setInterval(() => {
        setHoverDuration(prev => prev + 0.1)
      }, 100)
    } else {
      setHoverDuration(0)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHovering])

  useEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    const update = () => setIsDesktop(mediaQuery.matches)
    update()
    mediaQuery.addEventListener('change', update)
    return () => mediaQuery.removeEventListener('change', update)
  }, [])

  // Reset decay when artwork changes
  useEffect(() => {
    setHoverDuration(0)
    setIsHovering(false)
    setTilt({ x: 0, y: 0 })
    setHoverStrength(0)
    setHoverDirection(null)
    setCanClick(true)
  }, [currentArtwork?.id])

  if (!currentArtwork) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <p className="text-gray-500 code-font">NO.CONCEPTS.FOUND</p>
      </div>
    )
  }

  const getFactionColor = (artwork: Artwork) =>
    factions[artwork.faction as keyof typeof factions]?.color || '#c41e3a'

  const handleMove = (nextDirection: Direction) => {
    if (!currentArtwork || cardStack.length === 0 || maxStackSize <= 1) return
    const remaining = cardStack.slice(1)
    const blocked = new Set([
      ...recentIds,
      currentArtwork.id,
      ...remaining.map((art) => art.id),
    ])
    const nextArtwork = pickNextArtwork(blocked, currentArtwork.id)
    const nextStack = [
      ...remaining,
      ...(nextArtwork && !remaining.find((art) => art.id === nextArtwork.id) ? [nextArtwork] : []),
    ].slice(0, maxStackSize)

    setDirection(nextDirection)
    setHistoryStack((prev) => [currentArtwork, ...prev].slice(0, 20))
    setCardStack(nextStack)
    setRecentIds((prev) => {
      const nextList = [
        currentArtwork.id,
        ...(nextArtwork ? [nextArtwork.id] : []),
        ...prev.filter((id) => id !== currentArtwork.id && id !== nextArtwork?.id),
      ]
      return nextList.slice(0, 20)
    })
  }

  const handleBackTo = (index: number) => {
    const previous = historyStack[index]
    if (!previous) return
    const remaining = historyStack.slice(index + 1)

    setDirection('back')
    setHistoryStack(remaining)
    const nextStack = buildStack(previous, new Set(recentIds))
    setCardStack(nextStack)
    setRecentIds((prev) => {
      const stackIds = nextStack.map((art) => art.id)
      const nextList = [...stackIds, ...prev.filter((id) => !stackIds.includes(id))]
      return nextList.slice(0, 20)
    })
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)

    const clampedX = clamp(x, -1, 1)
    const clampedY = clamp(y, -1, 1)

    setTilt({ x: clampedX * 12, y: clampedY * -12 })
    setIsHovering(true)

    const intensity = clamp(Math.max(Math.abs(clampedX), Math.abs(clampedY)), 0, 1)
    setHoverStrength(intensity)
    setHoverDirection(getDirection(clampedX, clampedY))
  }

  const handlePointerLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHoverStrength(0)
    setHoverDirection(null)
    setIsHovering(false)
    setCanClick(true)
  }

  const handleCardClick = () => {
    if (!hoverDirection || hoverStrength < 0.3 || !canClick) return
    setCanClick(false)
    handleMove(hoverDirection)
    setTimeout(() => setCanClick(true), 200)
  }

  const handleEdgeClick = (nextDirection: Direction) => {
    if (!canClick) return
    setCanClick(false)
    handleMove(nextDirection)
    setTimeout(() => setCanClick(true), 200)
  }

  const handleDrag = (_: unknown, info: { offset: { x: number; y: number } }) => {
    const { x, y } = info.offset
    setTilt({ x: clamp(x / 20, -12, 12), y: clamp(-y / 20, -12, 12) })
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

  // Calculate cyber decay intensity (kicks in after 3 seconds)
  const decayIntensity = clamp((hoverDuration - 3) / 2, 0, 1)
  const stackOffset = isDesktop ? 120 : 70
  const stackDrop = isDesktop ? 36 : 24
  const cardWidthClass = 'relative aspect-[3/4] w-[78%] sm:w-[80%] md:w-[82%] lg:w-[84%]'
  const edgeFadeStyle = {
    WebkitMaskImage: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0.55) 100%)',
    maskImage: 'linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,1) 8%, rgba(0,0,0,1) 92%, rgba(0,0,0,0.55) 100%)',
  }
  const stackLayouts = [
    { x: 0, y: 0, scale: 1, rotate: 0, opacity: 1, zIndex: 30 },
    { x: -stackOffset, y: stackDrop, scale: 0.96, rotate: -2, opacity: 0.9, zIndex: 20 },
    { x: stackOffset, y: stackDrop * 2, scale: 0.93, rotate: 2, opacity: 0.68, zIndex: 10 },
  ]

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
            <h1 className="text-2xl md:text-6xl font-bold mb-4 code-font">
              <GlitchText
                text=">>>_CONCEPT.ARCHIVE"
                className="text-crimson-bright text-glow inline-block"
                as="span"
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

          <div className="flex justify-center mb-8">
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
                <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg" style={{ perspective: '1400px' }}>
                  <AnimatePresence mode="popLayout" custom={direction}>
                    {cardStack.map((artwork, index) => {
                      const layout = stackLayouts[index] ?? stackLayouts[stackLayouts.length - 1]
                      const isTop = index === 0
                      const factionColor = getFactionColor(artwork)
                      const cardDecay = isTop ? decayIntensity : 0
                      const cardGlow = isTop && hoverDirection ? glowMap[hoverDirection] : 'transparent'
                      const cardShell = (
                        <motion.div
                          className="relative h-full w-full overflow-hidden bg-[#0b0f14]"
                          style={{
                            border: '2px solid rgba(196, 30, 58, 0.4)',
                            ...(isTop ? edgeFadeStyle : {}),
                          }}
                          animate={{
                            boxShadow: [
                              `0 0 16px ${factionColor}22, 0 0 20px rgba(196, 30, 58, 0.3), inset 0 0 20px rgba(196, 30, 58, 0.1)`,
                              `0 0 16px ${factionColor}22, 0 0 35px rgba(196, 30, 58, 0.6), inset 0 0 30px rgba(196, 30, 58, 0.2)`,
                              `0 0 16px ${factionColor}22, 0 0 20px rgba(196, 30, 58, 0.3), inset 0 0 20px rgba(196, 30, 58, 0.1)`,
                            ],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <div className="absolute inset-0" style={{ background: cardGlow }} />
                          <Image
                            src={artwork.image}
                            alt={artwork.title}
                            fill
                            className="object-cover transition-all duration-300"
                            style={{
                              filter: cardDecay > 0 ? `blur(${cardDecay * 2}px) contrast(${1 + cardDecay * 0.3})` : 'none'
                            }}
                            priority={isTop}
                          />

                          {cardDecay > 0 && (
                            <>
                              <motion.div
                                className="absolute inset-0 pointer-events-none mix-blend-screen"
                                animate={{
                                  x: [0, -2, 2, -1, 1, 0],
                                  opacity: [cardDecay * 0.3, cardDecay * 0.5, cardDecay * 0.3]
                                }}
                                transition={{ duration: 0.2, repeat: Infinity }}
                                style={{
                                  background: `linear-gradient(45deg, rgba(255,0,0,${cardDecay * 0.2}), rgba(0,255,255,${cardDecay * 0.2}))`
                                }}
                              />

                              <div
                                className="absolute inset-0 pointer-events-none"
                                style={{
                                  opacity: cardDecay * 0.4,
                                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                  mixBlendMode: 'overlay'
                                }}
                              />

                              <motion.div
                                className="absolute inset-0 pointer-events-none"
                                animate={{ y: ['0%', '100%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                style={{
                                  opacity: cardDecay * 0.6,
                                  backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,0,0,0.3) 2px, rgba(255,0,0,0.3) 4px)'
                                }}
                              />

                              {cardDecay > 0.5 && (
                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0.6, 1, 0.6] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 code-font text-xs font-bold tracking-wider"
                                  style={{ textShadow: '0 0 8px rgba(255,0,0,0.8)' }}
                                >
                                  [DATA CORRUPTION DETECTED]
                                </motion.div>
                              )}
                            </>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-transparent to-transparent" />
                          <div className="absolute top-4 left-4 flex items-center gap-2 text-xs code-font text-gray-300">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: factionColor }} />
                            <span>{artwork.faction.toUpperCase()}</span>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                            <DecryptText
                              text={artwork.title}
                              className="text-base md:text-lg font-bold text-crimson-bright mb-2 code-font"
                              as="h2"
                              speed={30}
                            />
                            <DecryptText
                              text={artwork.description}
                              className="text-xs text-gray-400 code-font"
                              as="p"
                              speed={20}
                            />
                            <div className="mt-3 flex items-center justify-between text-[10px] text-gray-600 code-font">
                              <span>DATE: {artwork.date}</span>
                              <span>HISTORY: {historyStack.length}/20</span>
                            </div>
                          </div>
                        </motion.div>
                      )

                      return (
                        <motion.div
                          key={artwork.id}
                          custom={direction}
                          variants={isTop ? cardVariants : undefined}
                          initial={isTop ? 'enter' : false}
                          animate={{
                            x: layout.x,
                            y: layout.y,
                            scale: layout.scale,
                            rotate: layout.rotate,
                            opacity: layout.opacity,
                          }}
                          exit={isTop ? 'exit' : undefined}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="absolute inset-0 flex items-center justify-center"
                          style={{ zIndex: layout.zIndex }}
                          layout
                        >
                          {isTop ? (
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
                              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                              className={`${cardWidthClass} cursor-grab active:cursor-grabbing shadow-[0_18px_40px_rgba(0,0,0,0.45)]`}
                            >
                              {cardShell}
                            </motion.div>
                          ) : (
                            <div className={`${cardWidthClass} pointer-events-none`}>
                              {cardShell}
                            </div>
                          )}
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>

                  <div className="pointer-events-none absolute inset-0 z-40 hidden md:block">
                    <button
                      type="button"
                      onClick={() => handleEdgeClick('west')}
                      className="pointer-events-auto absolute left-0 top-0 h-full w-[12%] bg-gradient-to-r from-crimson/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                      aria-label="Discard left"
                    />
                    <button
                      type="button"
                      onClick={() => handleEdgeClick('east')}
                      className="pointer-events-auto absolute right-0 top-0 h-full w-[12%] bg-gradient-to-l from-crimson/20 to-transparent opacity-0 hover:opacity-100 transition-opacity"
                      aria-label="Discard right"
                    />
                  </div>
                </div>

                <div className="border border-crimson/20 bg-[#0b0f14] px-4 py-2 text-[10px] code-font text-gray-500">
                  INPUT: SWIPE / DRAG / EDGE CLICK
                </div>
              </div>
            ) : (
              <div className="h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-crimson/20 bg-[#0b0f14] p-4">
                  <div className="text-xs text-gray-500 code-font mb-3">RECENT.PATH</div>
                  <div className="space-y-3">
                    {historyStack.slice(0, 6).map((art, index) => (
                      <div key={art.id} className="flex items-center gap-3 w-full text-left group">
                        <button
                          type="button"
                          onClick={() => setFullscreenImage(art)}
                          className="relative w-12 h-12 overflow-hidden border border-crimson/20 flex-shrink-0 hover:border-crimson-bright transition-colors"
                        >
                          <Image
                            src={art.image}
                            alt={art.title}
                            fill
                            className="object-cover"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleBackTo(index)}
                          className="flex-1 text-left"
                        >
                          <div className="text-xs text-gray-300 code-font group-hover:text-crimson-bright transition-colors">
                            {art.title}
                          </div>
                          <div className="text-[10px] text-gray-500 code-font">BACKTRACK</div>
                        </button>
                      </div>
                    ))}
                    {historyStack.length === 0 && (
                      <div className="text-xs text-gray-600 code-font">NO.BACK.CARDS</div>
                    )}
                  </div>
                </div>

                <div className="border border-crimson/20 bg-[#0b0f14] p-4 text-xs code-font text-gray-500 space-y-3">
                  <div>INPUT: SWIPE / DRAG / EDGE CLICK</div>
                  <div>DISCARD VECTOR: DIRECTIONAL THROW</div>
                  <div>DEDUP CACHE: 20 FRAMES</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/95 backdrop-blur-sm z-[999]"
              onClick={() => setFullscreenImage(null)}
            />

            {/* Fullscreen Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
              onClick={() => setFullscreenImage(null)}
            >
              <div className="relative w-full h-full max-w-6xl max-h-[90vh] flex items-center justify-center">
                {/* Close Button */}
                <motion.button
                  onClick={() => setFullscreenImage(null)}
                  className="absolute top-0 right-0 z-10 flex items-center gap-2 px-4 py-2 bg-crimson/90 hover:bg-crimson border-2 border-crimson-bright text-white code-font text-sm font-bold tracking-wider transition-all"
                  style={{ boxShadow: '0 0 20px rgba(196, 30, 58, 0.8)' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close fullscreen"
                >
                  <svg className="h-5 w-5" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>CLOSE</span>
                </motion.button>

                {/* Image with pulsing border */}
                <motion.div
                  className="relative w-full h-full bg-[#0b0f14]"
                  style={{
                    border: '2px solid rgba(196, 30, 58, 0.4)',
                  }}
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(196, 30, 58, 0.3), inset 0 0 20px rgba(196, 30, 58, 0.1)',
                      '0 0 40px rgba(196, 30, 58, 0.7), inset 0 0 30px rgba(196, 30, 58, 0.2)',
                      '0 0 20px rgba(196, 30, 58, 0.3), inset 0 0 20px rgba(196, 30, 58, 0.1)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={fullscreenImage.image}
                    alt={fullscreenImage.title}
                    fill
                    className="object-contain"
                    priority
                  />

                  {/* Image info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
                    <div className="flex items-center gap-2 text-xs code-font text-gray-300 mb-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: getFactionColor(fullscreenImage) }} />
                      <span>{fullscreenImage.faction.toUpperCase()}</span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-crimson-bright mb-2 code-font">
                      {fullscreenImage.title}
                    </h2>
                    <p className="text-sm text-gray-400 code-font mb-3">
                      {fullscreenImage.description}
                    </p>
                    <div className="text-xs text-gray-600 code-font">
                      DATE: {fullscreenImage.date}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
