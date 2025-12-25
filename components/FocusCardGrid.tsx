'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export type FocusCard = {
  id: string
  title: string
  sector: string
  summary: string
  tags: string[]
  stats: Array<{ label: string; value: string }>
  details: string[]
  code: string
  accent: string
  accentSoft: string
  icon: JSX.Element
  meta?: Array<{ label: string; value: string }>
}

type CardOrigin = {
  x: number
  y: number
  width: number
  height: number
}

type SelectedCard = {
  card: FocusCard
  origin?: CardOrigin
}

type FocusCardGridProps = {
  cards: FocusCard[]
  layoutPrefix: string
  gridClassName?: string
  panelLabel?: string
  panelWidthClass?: string
  backLabel?: string
}

export default function FocusCardGrid({
  cards,
  layoutPrefix,
  gridClassName = 'grid grid-cols-1 md:grid-cols-3 gap-4',
  panelLabel = 'INTEL.PAYLOAD',
  panelWidthClass = 'w-[min(92vw,1100px)]',
  backLabel = 'BACK',
}: FocusCardGridProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [selectedCard, setSelectedCard] = useState<SelectedCard | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [cardOrigins, setCardOrigins] = useState<Record<string, CardOrigin>>({})
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') {
      return
    }
    const updateOrigins = () => {
      const nextOrigins: Record<string, CardOrigin> = {}
      cards.forEach((card) => {
        const el = cardRefs.current[card.id]
        if (el) {
          const rect = el.getBoundingClientRect()
          nextOrigins[card.id] = {
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          }
        }
      })
      setCardOrigins(nextOrigins)
    }
    updateOrigins()
    window.addEventListener('resize', updateOrigins)
    return () => window.removeEventListener('resize', updateOrigins)
  }, [cards])

  useEffect(() => {
    if (!selectedCard) {
      setPanelOpen(false)
      return
    }
    setIsClosing(false)
    const timer = setTimeout(() => setPanelOpen(true), 350)
    return () => clearTimeout(timer)
  }, [selectedCard])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (card: FocusCard) => {
    if (isClosing) {
      return
    }
    if (selectedCard?.card.id === card.id) {
      return
    }
    setSelectedCard({
      card,
      origin: cardOrigins[card.id],
    })
  }

  const handleClose = () => {
    if (!selectedCard) {
      return
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setPanelOpen(false)
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedCard(null)
      setIsClosing(false)
      closeTimeoutRef.current = null
    }, 380)
  }

  const cardVariants = {
    idle: { scale: 1, opacity: 1, filter: 'brightness(1)' },
    dimmed: { scale: 0.94, opacity: 0.12, filter: 'brightness(0.65) blur(12px)' },
    dimmedDeep: { scale: 0.92, opacity: 0.08, filter: 'brightness(0.55) blur(16px)' },
    selected: { scale: 1.04, opacity: 1, filter: 'brightness(1.06)' },
    selectedSoft: { scale: 0.96, opacity: 0.7, filter: 'brightness(0.75)' },
  }

  const renderCardContent = (card: FocusCard, isHovered: boolean) => (
    <>
      <div
        className="absolute inset-x-0 top-0 h-14"
        style={{
          background: `linear-gradient(90deg, ${card.accentSoft}, rgba(10, 14, 20, 0) 70%)`
        }}
      />
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: `linear-gradient(90deg, ${card.accent}, transparent)` }}
      />
      <div className="absolute right-2 sm:right-3 top-2 sm:top-3 text-[9px] sm:text-[10px] text-gray-500 tracking-[0.3em] sm:tracking-[0.4em]">
        {card.code}
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0"
        animate={isHovered ? { opacity: 1, x: ['-60%', '120%'] } : { opacity: 0, x: '-60%' }}
        transition={{ duration: 1.4, repeat: isHovered ? Infinity : 0, ease: 'linear' }}
        style={{
          background: `linear-gradient(90deg, transparent, ${card.accentSoft}, transparent)`
        }}
      />

      <div className="relative z-10 space-y-3 sm:space-y-4">
        <div className="flex items-start justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div
              className="h-9 w-9 sm:h-11 sm:w-11 border bg-[#0b0f14] flex items-center justify-center flex-shrink-0"
              style={{
                borderColor: card.accent,
                boxShadow: `0 0 12px ${card.accentSoft}`,
              }}
            >
              <div style={{ color: card.accent }} className="scale-90 sm:scale-100">{card.icon}</div>
            </div>
            <div>
              <div className="text-[9px] sm:text-[10px] text-gray-500 tracking-[0.25em] sm:tracking-[0.35em]">{card.sector}</div>
              <div className="text-base sm:text-lg font-bold uppercase tracking-wide code-font" style={{ color: card.accent }}>
                {card.title}
              </div>
            </div>
          </div>
          <div className="hidden sm:flex flex-col items-end text-[10px] text-gray-500">
            <span className="tracking-[0.35em]">NODE</span>
            <span className="text-gray-400">{card.code}</span>
          </div>
        </div>

        <div className="text-[11px] sm:text-xs text-gray-300 leading-relaxed">{card.summary}</div>

        <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-gray-500">
          {card.tags.map((tag) => (
            <span key={tag} className="px-1.5 sm:px-2 py-0.5 sm:py-1 border border-crimson/20 bg-[#0b0f14]/70">
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] text-gray-500">
          {card.stats.map((stat) => (
            <div key={stat.label} className="border border-crimson/10 bg-[#0b0f14]/70 px-1.5 sm:px-2 py-1">
              <div className="text-[8px] sm:text-[9px] text-gray-600">{stat.label}</div>
              <div className="text-gray-300 font-semibold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div className="relative w-full">
      <div className={`${gridClassName} ${selectedCard ? 'pointer-events-none' : ''}`}>
        {cards.map((card) => {
          const isSelected = selectedCard?.card.id === card.id
          const isHovered = hoveredCard === card.id && !selectedCard
          const cardState: keyof typeof cardVariants = !selectedCard
            ? 'idle'
            : isSelected
              ? panelOpen
                ? 'selectedSoft'
                : 'selected'
              : panelOpen
                ? 'dimmedDeep'
                : 'dimmed'

          return (
            <motion.div
              key={card.id}
              layoutId={`${layoutPrefix}-${card.id}`}
              ref={(node) => {
                cardRefs.current[card.id] = node
              }}
              role="button"
              tabIndex={0}
              aria-label={`Open ${card.title} details`}
              onClick={() => handleSelect(card)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  handleSelect(card)
                }
              }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onFocus={() => setHoveredCard(card.id)}
              onBlur={() => setHoveredCard(null)}
              animate={cardVariants[cardState]}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className={`relative p-3 sm:p-4 md:p-5 bg-dark-teal border border-crimson/30 overflow-hidden code-font touch-manipulation ${isSelected ? 'opacity-0' : ''}`}
            >
              {renderCardContent(card, isHovered)}
            </motion.div>
          )
        })}
      </div>

      <AnimatePresence>
        {selectedCard && (
          <motion.div
            key={`${layoutPrefix}-focus`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 pointer-events-none"
          >
            <motion.div
              className="absolute inset-0 bg-black/15"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <div className="relative h-full flex items-center justify-center px-4 md:px-8">
              <div className="relative w-full h-full flex items-center justify-center pointer-events-auto">
                <motion.div
                  layoutId={`${layoutPrefix}-${selectedCard.card.id}`}
                  className="relative z-10 w-full max-w-sm p-5 bg-dark-teal border border-crimson/40 overflow-hidden code-font"
                  animate={cardVariants[panelOpen ? 'selectedSoft' : 'selected']}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                >
                  {renderCardContent(selectedCard.card, false)}
                </motion.div>

                <AnimatePresence>
                  {panelOpen && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                      <motion.div
                        key={`${layoutPrefix}-panel`}
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.35, ease: 'easeOut' }}
                        className={panelWidthClass}
                      >
                        <div className="relative bg-[#05070a]/80 border border-crimson/20 p-5 md:p-6 max-h-[70vh] overflow-y-auto md:max-h-none md:overflow-visible">
                          <div className="absolute inset-0 border border-crimson/20 opacity-40" />
                          <div className="absolute inset-2 border border-crimson/10 opacity-40" />
                          <div className="relative">
                            <div className="flex items-center justify-between text-[10px] text-gray-500 tracking-[0.35em]">
                              <span>{panelLabel}</span>
                              <span>{selectedCard.card.code}</span>
                            </div>
                            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                              {(selectedCard.card.meta?.length ? selectedCard.card.meta : [
                                { label: 'ID', value: selectedCard.card.id.toUpperCase() },
                                { label: 'ORIGIN', value: selectedCard.origin ? `${Math.round(selectedCard.origin.x)}:${Math.round(selectedCard.origin.y)}` : 'N/A' },
                              ]).map((item) => (
                                <div key={item.label} className="border border-crimson/10 bg-black/40 px-2 py-1">
                                  {item.label}: {item.value}
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 text-sm text-gray-300">{selectedCard.card.summary}</div>
                            <div className="mt-4 space-y-2 text-xs text-gray-400">
                              {selectedCard.card.details.map((detail) => (
                                <div key={detail} className="flex items-start gap-2">
                                  <span className="text-crimson-bright">-</span>
                                  <span>{detail}</span>
                                </div>
                              ))}
                            </div>
                            <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-gray-500">
                              {selectedCard.card.stats.map((stat) => (
                                <div key={stat.label} className="border border-crimson/10 bg-black/40 px-2 py-1">
                                  <div className="text-[9px] text-gray-600">{stat.label}</div>
                                  <div className="text-gray-300">{stat.value}</div>
                                </div>
                              ))}
                            </div>
                            <div className="mt-6 pt-4 border-t border-crimson/10 flex justify-center">
                              <button
                                type="button"
                                onClick={handleClose}
                                className="flex items-center gap-2 border border-crimson/30 bg-[#0b0f14]/80 px-4 py-2 text-[11px] text-gray-300 code-font tracking-widest"
                              >
                                <span className="text-crimson-bright">&lt;-</span>
                                <span>{backLabel}</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
