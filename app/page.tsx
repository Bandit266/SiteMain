'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import Link from 'next/link'
import DecryptText from '@/components/DecryptText'
import GlitchText from '@/components/GlitchText'

type IntelCard = {
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
}

type CardOrigin = {
  x: number
  y: number
  width: number
  height: number
}

type SelectedIntel = {
  card: IntelCard
  origin?: CardOrigin
}

const intelCards: IntelCard[] = [
  {
    id: 'game-design',
    title: 'Game Design',
    sector: 'DIVISION.ALPHA',
    summary: 'Systemic loops, progression pacing, and risk/reward tuning built for long sessions.',
    tags: ['LOOPS', 'PROGRESSION', 'ECONOMY'],
    stats: [
      { label: 'SYSTEMS', value: '09' },
      { label: 'BALANCE', value: 'LIVE' },
      { label: 'PACING', value: 'TUNED' },
    ],
    details: [
      'Dynamic objectives with escalating stakes.',
      'Reward curves mapped to extraction tension.',
      'Player choice routing across missions.',
    ],
    code: 'INT-01',
    accent: '#e63946',
    accentSoft: 'rgba(230, 57, 70, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M7 7h10v10H7z" />
        <path d="M12 4v16M4 12h16" />
      </svg>
    )
  },
  {
    id: 'engine-development',
    title: 'Engine Development',
    sector: 'DIVISION.BETA',
    summary: 'Custom tools, rendering optimizations, and runtime pipelines built for stability.',
    tags: ['TOOLS', 'PERF', 'PIPELINE'],
    stats: [
      { label: 'FPS', value: '144' },
      { label: 'MEM', value: 'OPT' },
      { label: 'TOOLS', value: 'LIVE' },
    ],
    details: [
      'Streaming and memory budgets tuned per zone.',
      'Profiling loops on every content drop.',
      'Debug overlays for live telemetry.',
    ],
    code: 'INT-02',
    accent: '#4f9cfb',
    accentSoft: 'rgba(79, 156, 251, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4" />
      </svg>
    )
  },
  {
    id: 'multiplayer-systems',
    title: 'Multiplayer Systems',
    sector: 'DIVISION.GAMMA',
    summary: 'Authoritative netcode, matchmaking, and scalable session orchestration.',
    tags: ['NETCODE', 'MATCH', 'SCALING'],
    stats: [
      { label: 'TICK', value: '60' },
      { label: 'REGION', value: 'GLOBAL' },
      { label: 'SEC', value: 'HARD' },
    ],
    details: [
      'Latency-aware routing with regional fallbacks.',
      'Session orchestration with rollback safety.',
      'Anti-cheat hooks across replication.',
    ],
    code: 'INT-03',
    accent: '#3ddc97',
    accentSoft: 'rgba(61, 220, 151, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="7" cy="12" r="2" />
        <circle cx="17" cy="7" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M9 12h6M8.5 11l7-3M8.5 13l7 3" />
      </svg>
    )
  },
  {
    id: 'animation',
    title: 'Animation',
    sector: 'DIVISION.DELTA',
    summary: 'Combat-ready rigs, state machines, and gameplay blends with cinematic polish.',
    tags: ['RIGS', 'BLENDS', 'COMBAT'],
    stats: [
      { label: 'STATES', value: '42' },
      { label: 'BLEND', value: 'FAST' },
      { label: 'SYNC', value: 'LOCK' },
    ],
    details: [
      'Layered locomotion with additive actions.',
      'Procedural recoil for weapon weight.',
      'Cinematic beats aligned to mission flow.',
    ],
    code: 'INT-04',
    accent: '#f5a524',
    accentSoft: 'rgba(245, 165, 36, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 16c3-6 5-6 8 0s5 6 8 0" />
        <path d="M6 8h4M14 8h4" />
      </svg>
    )
  },
  {
    id: 'three-d-design',
    title: '3D Design',
    sector: 'DIVISION.ECHO',
    summary: 'Modular hard-surface kits, optimized props, and terrain composition.',
    tags: ['MODEL', 'TEXTURE', 'LOD'],
    stats: [
      { label: 'ASSETS', value: '180+' },
      { label: 'LOD', value: 'AUTO' },
      { label: 'TRI', value: 'BUDG' },
    ],
    details: [
      'Modular kitbashing for rapid world building.',
      'Material libraries tuned for realism.',
      'Performance-focused LOD stacks.',
    ],
    code: 'INT-05',
    accent: '#f97316',
    accentSoft: 'rgba(249, 115, 22, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l7 4v10l-7 4-7-4V7z" />
        <path d="M12 3v18M5 7l7 4 7-4" />
      </svg>
    )
  },
  {
    id: 'sound-design',
    title: 'Sound Design',
    sector: 'DIVISION.FOXTROT',
    summary: 'Reactive soundscapes, spatial mixing, and dynamic audio cues.',
    tags: ['FOLEY', 'MIX', 'SPATIAL'],
    stats: [
      { label: 'BANKS', value: '32' },
      { label: 'DSP', value: 'LIVE' },
      { label: 'MIX', value: '3D' },
    ],
    details: [
      'Environmental layers for weather and tension.',
      'Adaptive music tied to encounter pacing.',
      'Spatial mix tuned for headset clarity.',
    ],
    code: 'INT-06',
    accent: '#22d3ee',
    accentSoft: 'rgba(34, 211, 238, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 10h4l5-4v12l-5-4H4z" />
        <path d="M16 8c1.5 1.5 1.5 6 0 7.5M18 6c3 3 3 9 0 12" />
      </svg>
    )
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState<'deploy' | 'intel'>('deploy')
  const [hoveredIntel, setHoveredIntel] = useState<string | null>(null)
  const [selectedIntel, setSelectedIntel] = useState<SelectedIntel | null>(null)
  const [panelOpen, setPanelOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})
  const [cardOrigins, setCardOrigins] = useState<Record<string, CardOrigin>>({})
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useLayoutEffect(() => {
    if (activeTab !== 'intel' || typeof window === 'undefined') {
      return
    }
    const updateOrigins = () => {
      const nextOrigins: Record<string, CardOrigin> = {}
      intelCards.forEach((card) => {
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
  }, [activeTab])

  useEffect(() => {
    if (!selectedIntel) {
      setPanelOpen(false)
      return
    }
    setIsClosing(false)
    const timer = setTimeout(() => setPanelOpen(true), 350)
    return () => clearTimeout(timer)
  }, [selectedIntel])

  useEffect(() => {
    if (activeTab !== 'intel') {
      setSelectedIntel(null)
      setPanelOpen(false)
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
        closeTimeoutRef.current = null
      }
    }
  }, [activeTab])

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current)
      }
    }
  }, [])

  const handleSelect = (card: IntelCard) => {
    if (isClosing) {
      return
    }
    if (selectedIntel?.card.id === card.id) {
      return
    }
    setSelectedIntel({
      card,
      origin: cardOrigins[card.id],
    })
  }

  const handleClose = () => {
    if (!selectedIntel) {
      return
    }
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current)
    }
    setPanelOpen(false)
    setIsClosing(true)
    closeTimeoutRef.current = setTimeout(() => {
      setSelectedIntel(null)
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

  const renderIntelCardContent = (card: IntelCard, isHovered: boolean) => (
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
    <div className="min-h-screen overflow-hidden">
      {/* Full-screen Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] pt-16 flex items-center justify-center px-4 overflow-hidden">
        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 code-font text-crimson-bright text-glow group cursor-default" style={{ letterSpacing: '0.2em' }}>
              <span className="group-hover:hidden">SYNTHETIX</span>
              <span className="hidden group-hover:inline-block">
                <DecryptText text="SYNTHETIX" as="span" speed={35} />
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-3xl mx-auto code-font leading-relaxed"
          >
            <DecryptText
              text="open_world.looter_shooter"
              className="inline-block"
              as="span"
            />
            <br />
            <DecryptText
              text="survival.extraction.multiplayer"
              className="inline-block"
              as="span"
            />
            <br />
            <DecryptText
              text="built.for.chaos.and.conquest"
              className="inline-block"
              as="span"
            />
          </motion.p>

          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="inline-flex gap-1 sm:gap-2 border border-crimson/20 bg-[#0b0f14] p-1 code-font text-xs sm:text-sm">
              {[
                { id: 'deploy', label: 'DEPLOY' },
                { id: 'intel', label: 'INTEL' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'deploy' | 'intel')}
                  className={`px-4 sm:px-6 py-2 sm:py-2.5 tracking-wider transition-all touch-manipulation ${
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

          {activeTab === 'deploy' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-stretch sm:items-center px-4 sm:px-0"
            >
              <Link
                href="/development"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-transparent neon-border text-crimson-bright font-semibold tracking-wider overflow-hidden code-font text-sm sm:text-base touch-manipulation text-center"
              >
                <DecryptText
                  text="VIEW_PROJECTS"
                  className="relative z-10"
                  as="span"
                />
                <div className="absolute inset-0 bg-crimson/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Link>
              <Link
                href="/contact"
                className="px-6 sm:px-8 py-3 sm:py-4 bg-crimson text-white font-semibold tracking-wider hover:bg-crimson-bright transition-all hover:shadow-lg hover:shadow-crimson/50 code-font text-sm sm:text-base touch-manipulation text-center"
              >
                <DecryptText
                  text="GET.IN.TOUCH"
                  as="span"
                />
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${selectedIntel ? 'pointer-events-none' : ''}`}>
                {intelCards.map((card) => {
                  const isSelected = selectedIntel?.card.id === card.id
                  const isHovered = hoveredIntel === card.id && !selectedIntel
                  const cardState: keyof typeof cardVariants = !selectedIntel
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
                      layoutId={`intel-card-${card.id}`}
                      ref={(node) => {
                        cardRefs.current[card.id] = node
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Open ${card.title} intel`}
                      onClick={() => handleSelect(card)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          handleSelect(card)
                        }
                      }}
                      onMouseEnter={() => setHoveredIntel(card.id)}
                      onMouseLeave={() => setHoveredIntel(null)}
                      onFocus={() => setHoveredIntel(card.id)}
                      onBlur={() => setHoveredIntel(null)}
                      animate={cardVariants[cardState]}
                      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                      className={`relative p-3 sm:p-4 md:p-5 bg-dark-teal border border-crimson/30 overflow-hidden code-font touch-manipulation ${isSelected ? 'opacity-0' : ''}`}
                    >
                      {renderIntelCardContent(card, isHovered)}
                    </motion.div>
                  )
                })}
              </div>

              <AnimatePresence>
                {selectedIntel && (
                  <motion.div
                    key="intel-focus"
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
                          layoutId={`intel-card-${selectedIntel.card.id}`}
                          className="relative z-10 w-full max-w-sm p-5 bg-dark-teal border border-crimson/40 overflow-hidden code-font"
                          animate={cardVariants[panelOpen ? 'selectedSoft' : 'selected']}
                          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                        >
                          {renderIntelCardContent(selectedIntel.card, false)}
                        </motion.div>

                        <AnimatePresence>
                          {panelOpen && (
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                              <motion.div
                                key="intel-panel"
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.35, ease: 'easeOut' }}
                                className="w-[min(92vw,1100px)]"
                              >
                                <div className="relative bg-[#05070a]/80 border border-crimson/20 p-5 md:p-6 max-h-[70vh] overflow-y-auto md:max-h-none md:overflow-visible">
                                  <div className="absolute inset-0 border border-crimson/20 opacity-40" />
                                  <div className="absolute inset-2 border border-crimson/10 opacity-40" />
                                  <div className="relative">
                                    <div className="flex items-center justify-between text-[10px] text-gray-500 tracking-[0.35em]">
                                      <span>INTEL.PAYLOAD</span>
                                      <span>{selectedIntel.card.code}</span>
                                    </div>
                                    <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] text-gray-500">
                                      <div className="border border-crimson/10 bg-black/40 px-2 py-1">
                                        ID: {selectedIntel.card.id.toUpperCase()}
                                      </div>
                                      <div className="border border-crimson/10 bg-black/40 px-2 py-1">
                                        ORIGIN: {selectedIntel.origin ? `${Math.round(selectedIntel.origin.x)}:${Math.round(selectedIntel.origin.y)}` : 'N/A'}
                                      </div>
                                    </div>
                                    <div className="mt-4 text-sm text-gray-300">{selectedIntel.card.summary}</div>
                                    <div className="mt-4 space-y-2 text-xs text-gray-400">
                                      {selectedIntel.card.details.map((detail) => (
                                        <div key={detail} className="flex items-start gap-2">
                                          <span className="text-crimson-bright">-</span>
                                          <span>{detail}</span>
                                        </div>
                                      ))}
                                    </div>
                                    <div className="mt-4 grid grid-cols-3 gap-2 text-[10px] text-gray-500">
                                      {selectedIntel.card.stats.map((stat) => (
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
                                        <span>BACK</span>
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
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

