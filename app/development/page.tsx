'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import GanttChartInteractive from '@/components/GanttChartInteractive'
import DecryptText from '@/components/DecryptText'
import FocusCardGrid, { type FocusCard } from '@/components/FocusCardGrid'

type ProjectCategory = 'all' | 'main' | 'complete' | 'tools'

type ProjectCard = FocusCard & {
  category: Exclude<ProjectCategory, 'all'>
}

const projectCards: ProjectCard[] = [
  {
    id: 'synthetics',
    title: 'Synthetics',
    sector: 'PROJECT.MAIN',
    summary: 'Fast-paced tactical shooter with quantum mechanics that let players manipulate time and space.',
    tags: ['UNREAL', 'C++', 'MULTIPLAYER'],
    stats: [
      { label: 'STATUS', value: 'IN_DEV' },
      { label: 'PROGRESS', value: '65%' },
      { label: 'YEAR', value: '2024' },
    ],
    details: [
      'Quantum abilities tied to stamina and cooldown loops.',
      'Extraction zones rotate with faction heat levels.',
      'Netcode tuning for 60 tick combat sessions.',
    ],
    code: 'PRJ-01',
    accent: '#e63946',
    accentSoft: 'rgba(230, 57, 70, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      </svg>
    ),
    meta: [
      { label: 'STATUS', value: 'IN_DEVELOPMENT' },
      { label: 'CATEGORY', value: 'MAIN' },
    ],
    category: 'main',
  },
  {
    id: 'neon-runner',
    title: 'Neon Runner',
    sector: 'PROJECT.COMPLETE',
    summary: 'Cyberpunk endless runner with procedural lanes and dynamic difficulty scaling.',
    tags: ['UNITY', 'C#', 'MOBILE'],
    stats: [
      { label: 'STATUS', value: 'RELEASED' },
      { label: 'PROGRESS', value: '100%' },
      { label: 'YEAR', value: '2024' },
    ],
    details: [
      'Procedural lane hazards with reactive pickups.',
      'New neon districts and unlockable runners.',
      'Mobile input tuned for swipe precision.',
    ],
    code: 'PRJ-02',
    accent: '#f97316',
    accentSoft: 'rgba(249, 115, 22, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12h16" />
        <path d="M14 6l6 6-6 6" />
      </svg>
    ),
    meta: [
      { label: 'STATUS', value: 'RELEASED' },
      { label: 'CATEGORY', value: 'COMPLETE' },
    ],
    category: 'complete',
  },
  {
    id: 'custom-engine',
    title: 'Custom Game Engine',
    sector: 'PROJECT.TOOLS',
    summary: 'Custom engine with modern rendering, asset tooling, and scalable runtime systems.',
    tags: ['C++', 'VULKAN', 'ENGINE'],
    stats: [
      { label: 'STATUS', value: 'IN_DEV' },
      { label: 'PROGRESS', value: '45%' },
      { label: 'YEAR', value: '2024' },
    ],
    details: [
      'Render graph with PBR and lighting passes.',
      'Entity component system for large scenes.',
      'Hot reload tooling and profiling overlays.',
    ],
    code: 'PRJ-03',
    accent: '#4f9cfb',
    accentSoft: 'rgba(79, 156, 251, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="12" height="12" rx="2" />
        <path d="M9 3v3M15 3v3M9 18v3M15 18v3M3 9h3M3 15h3M18 9h3M18 15h3" />
      </svg>
    ),
    meta: [
      { label: 'STATUS', value: 'IN_DEVELOPMENT' },
      { label: 'CATEGORY', value: 'TOOLS' },
    ],
    category: 'tools',
  },
  {
    id: 'medieval-tactics',
    title: 'Medieval Tactics',
    sector: 'PROJECT.COMPLETE',
    summary: 'Turn-based strategy game with advanced AI and procedural campaign generation.',
    tags: ['UNITY', 'STRATEGY', 'AI'],
    stats: [
      { label: 'STATUS', value: 'RELEASED' },
      { label: 'PROGRESS', value: '100%' },
      { label: 'YEAR', value: '2023' },
    ],
    details: [
      'Adaptive AI with morale and flank systems.',
      'Procedural campaigns with branching objectives.',
      'Accessibility pass for UI and controls.',
    ],
    code: 'PRJ-04',
    accent: '#3ddc97',
    accentSoft: 'rgba(61, 220, 151, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 3l7 4v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V7l7-4z" />
      </svg>
    ),
    meta: [
      { label: 'STATUS', value: 'RELEASED' },
      { label: 'CATEGORY', value: 'COMPLETE' },
    ],
    category: 'complete',
  },
]

const projectFilters: Array<{ id: ProjectCategory; label: string }> = [
  { id: 'all', label: 'ALL' },
  { id: 'main', label: 'MAIN' },
  { id: 'complete', label: 'COMPLETE' },
  { id: 'tools', label: 'TOOLS' },
]

const updateCards: FocusCard[] = [
  {
    id: 'beta-wave',
    title: 'Synthetics Multiplayer Beta',
    sector: 'UPDATE.DEC.2024',
    summary: 'Closed beta launched with 500 players and performance optimization underway.',
    tags: ['BETA', 'NETCODE', 'STRESS'],
    stats: [
      { label: 'PLAYERS', value: '500' },
      { label: 'BUILD', value: 'BETA' },
      { label: 'FOCUS', value: 'PERF' },
    ],
    details: [
      'Regional matchmaking queues validated under load.',
      'Server tick stability measured across peaks.',
      'Latency routing tuned for rollback safety.',
    ],
    code: 'UPD-01',
    accent: '#e63946',
    accentSoft: 'rgba(230, 57, 70, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="12" r="2" />
        <circle cx="18" cy="7" r="2" />
        <circle cx="18" cy="17" r="2" />
        <path d="M8 12h8M8.5 11l8-4M8.5 13l8 4" />
      </svg>
    ),
    meta: [
      { label: 'DATE', value: 'DEC.2024' },
      { label: 'CHANNEL', value: 'BETA' },
    ],
  },
  {
    id: 'post-launch',
    title: 'Neon Runner Post-Launch Update',
    sector: 'UPDATE.NOV.2024',
    summary: 'Major content drop with new levels and improved mobile controls.',
    tags: ['PATCH', 'MOBILE', 'LEVELS'],
    stats: [
      { label: 'BUILD', value: '1.4' },
      { label: 'PLATFORM', value: 'MOBILE' },
      { label: 'IMPACT', value: 'UX' },
    ],
    details: [
      'New neon districts with expanded route variety.',
      'Input latency fixes on Android devices.',
      'Difficulty pacing tuned from player feedback.',
    ],
    code: 'UPD-02',
    accent: '#f97316',
    accentSoft: 'rgba(249, 115, 22, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 12h10" />
        <path d="M10 6l6 6-6 6" />
        <circle cx="19" cy="12" r="2" />
      </svg>
    ),
    meta: [
      { label: 'DATE', value: 'NOV.2024' },
      { label: 'CHANNEL', value: 'PATCH' },
    ],
  },
  {
    id: 'engine-milestone',
    title: 'Engine Development Milestone',
    sector: 'UPDATE.OCT.2024',
    summary: 'Custom engine now supports PBR rendering and real-time global illumination.',
    tags: ['RENDER', 'TOOLS', 'PBR'],
    stats: [
      { label: 'FEATURE', value: 'GI' },
      { label: 'STATUS', value: 'LIVE' },
      { label: 'FOCUS', value: 'RENDER' },
    ],
    details: [
      'PBR pipeline validated with cinematic passes.',
      'Asset import path stabilized for teams.',
      'Benchmarks improved on mid-tier hardware.',
    ],
    code: 'UPD-03',
    accent: '#4f9cfb',
    accentSoft: 'rgba(79, 156, 251, 0.18)',
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16v12H4z" />
        <path d="M8 10h8M8 14h6" />
      </svg>
    ),
    meta: [
      { label: 'DATE', value: 'OCT.2024' },
      { label: 'CHANNEL', value: 'ENGINE' },
    ],
  },
]

export default function Development() {
  const [activeTab, setActiveTab] = useState<'projects' | 'timeline' | 'updates'>('timeline')
  const [filter, setFilter] = useState<ProjectCategory>('all')

  const filteredProjects = filter === 'all'
    ? projectCards
    : projectCards.filter(project => project.category === filter)

  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      <section className="relative h-[calc(100vh-4rem)] px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-4"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-3 code-font">
              <DecryptText
                text=">>>_DEVELOPMENT.PORTAL"
                className="text-crimson-bright text-glow block max-w-full break-words"
                as="span"
                speed={40}
              />
            </h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto code-font">
              <DecryptText
                text="follow.my_journey.in_creating.innovative_games.and.tools"
                as="span"
                speed={25}
                className="break-words"
              />
            </p>
          </motion.div>

          <div className="flex justify-center mb-4">
            <div className="inline-flex gap-2 border border-crimson/20 bg-[#0b0f14] p-1 code-font text-xs">
              {[
                { id: 'projects', label: 'PROJECTS' },
                { id: 'timeline', label: 'TIMELINE' },
                { id: 'updates', label: 'UPDATES' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'projects' | 'timeline' | 'updates')}
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
            {activeTab === 'projects' && (
              <div className="h-full flex flex-col gap-4">
                <div className="flex flex-wrap justify-center gap-2">
                  {projectFilters.map((category) => {
                    const isActive = filter === category.id
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => setFilter(category.id)}
                        className={`relative overflow-hidden px-3 py-1 text-[10px] md:text-xs font-semibold tracking-wider transition-all code-font border bg-[#0b0f14]/70 ${
                          isActive
                            ? 'border-crimson-bright bg-crimson/20 text-crimson-bright'
                            : 'border-crimson/30 text-gray-500 hover:text-crimson-bright'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="relative z-10">
                          <DecryptText text={category.label} as="span" speed={30} />
                        </span>
                        <motion.span
                          className="pointer-events-none absolute inset-0 opacity-0"
                          animate={isActive ? { opacity: 1, x: ['-60%', '120%'] } : { opacity: 0, x: '-60%' }}
                          transition={{ duration: 1.4, repeat: isActive ? Infinity : 0, ease: 'linear' }}
                          style={{
                            background: 'linear-gradient(90deg, transparent, rgba(196, 30, 58, 0.25), transparent)'
                          }}
                        />
                      </motion.button>
                    )
                  })}
                </div>

                <FocusCardGrid
                  cards={filteredProjects}
                  layoutPrefix="dev-projects"
                  panelLabel="PROJECT.PAYLOAD"
                  gridClassName="grid grid-cols-1 md:grid-cols-2 gap-4"
                />
              </div>
            )}

            {activeTab === 'timeline' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <GanttChartInteractive />
              </motion.div>
            )}

            {activeTab === 'updates' && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="h-full"
              >
                <FocusCardGrid
                  cards={updateCards}
                  layoutPrefix="dev-updates"
                  panelLabel="UPDATE.PAYLOAD"
                  gridClassName="grid grid-cols-1 md:grid-cols-3 gap-4"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
