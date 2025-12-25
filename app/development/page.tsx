'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import GanttChartInteractive from '@/components/GanttChartInteractive'
import DecryptText from '@/components/DecryptText'

export default function Development() {
  const [activeTab, setActiveTab] = useState<'projects' | 'timeline' | 'updates'>('timeline')
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'SYNTHETICS',
      category: 'main',
      status: 'In Development',
      tags: ['Unreal Engine', 'C++', 'Multiplayer'],
      description: 'Fast-paced tactical shooter with unique quantum mechanics allowing players to manipulate time and space.',
      progress: 65,
      year: '2024',
    },
    {
      id: 2,
      title: 'NEON RUNNER',
      category: 'complete',
      status: 'Released',
      tags: ['Unity', 'C#', 'Mobile'],
      description: 'Cyberpunk-themed endless runner with procedural level generation and dynamic difficulty scaling.',
      progress: 100,
      year: '2024',
    },
    {
      id: 3,
      title: 'CUSTOM GAME ENGINE',
      category: 'tools',
      status: 'In Development',
      tags: ['C++', 'Vulkan', 'Engine'],
      description: 'Building a custom game engine from scratch with modern rendering pipeline and entity component system.',
      progress: 45,
      year: '2024',
    },
    {
      id: 4,
      title: 'MEDIEVAL TACTICS',
      category: 'complete',
      status: 'Released',
      tags: ['Unity', 'Strategy', 'AI'],
      description: 'Turn-based strategy game with advanced AI and procedural campaign generation.',
      progress: 100,
      year: '2023',
    },
  ]

  const devUpdates = [
    {
      date: 'DEC 2024',
      title: 'Synthetics Multiplayer Beta',
      content: 'Successfully launched closed beta testing with 500 players. Performance optimization ongoing.',
    },
    {
      date: 'NOV 2024',
      title: 'Neon Runner Post-Launch Update',
      content: 'Released major content update with new levels and improved mobile controls based on player feedback.',
    },
    {
      date: 'OCT 2024',
      title: 'Engine Development Milestone',
      content: 'Custom engine now supports PBR rendering and real-time global illumination.',
    },
  ]

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter)

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
                className="text-crimson-bright text-glow inline-block"
                as="span"
                speed={40}
              />
            </h1>
            <p className="text-xs md:text-sm text-gray-400 max-w-2xl mx-auto code-font">
              <DecryptText
                text="follow.my_journey.in_creating.innovative_games.and.tools"
                as="span"
                speed={25}
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
                  {['all', 'main', 'complete', 'tools'].map((category) => (
                    <button
                      key={category}
                      onClick={() => setFilter(category)}
                      className={`px-3 py-1 text-[10px] md:text-xs font-semibold tracking-wider transition-all code-font ${
                        filter === category
                          ? 'bg-crimson text-white'
                          : 'bg-transparent neon-border text-crimson-bright hover:bg-crimson/10'
                      }`}
                    >
                      <DecryptText text={category.toUpperCase()} as="span" speed={30} />
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="bg-dark-card neon-border p-4 scan-line group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <DecryptText
                          text={project.title}
                          className="text-lg font-bold text-crimson-bright group-hover:text-glow transition-all code-font"
                          as="h3"
                          speed={40}
                        />
                        <span className="text-[10px] text-gray-500 code-font">{project.year}</span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-[10px] bg-dark-bg text-gray-400 border border-crimson/20 code-font"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <p className="text-gray-400 mb-4 leading-relaxed code-font text-xs">
                        {project.description}
                      </p>

                      <div className="mb-3">
                        <div className="flex justify-between mb-1">
                          <span className="text-[10px] text-gray-500 code-font">PROGRESS</span>
                          <span className="text-[10px] text-crimson-bright code-font">{project.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-dark-bg rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
                            className="h-full bg-crimson"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className={`text-xs font-semibold code-font ${
                          project.status === 'Released' ? 'text-green-500' : 'text-crimson-bright'
                        }`}>
                          {project.status.toUpperCase().replace(' ', '_')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {devUpdates.map((update, index) => (
                  <motion.div
                    key={update.date}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-dark-card neon-border p-4"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 bg-crimson-bright rounded-full animate-pulse" />
                      <span className="text-[10px] text-gray-500 tracking-wider code-font">{update.date}</span>
                    </div>
                    <DecryptText
                      text={update.title.toUpperCase().replace(/ /g, '_')}
                      className="text-sm font-bold text-crimson-bright mb-2 code-font"
                      as="h3"
                      speed={35}
                    />
                    <p className="text-gray-400 code-font text-xs">{update.content}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
