'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import DecryptText from '@/components/DecryptText'
import FocusCardGrid, { type FocusCard } from '@/components/FocusCardGrid'

const intelCards: FocusCard[] = [
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
              <FocusCardGrid
                cards={intelCards}
                layoutPrefix="home-intel"
                panelLabel="INTEL.PAYLOAD"
                gridClassName="grid grid-cols-1 md:grid-cols-3 gap-4"
              />
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

