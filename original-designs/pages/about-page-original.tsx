'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Terminal from '@/components/Terminal'
import DecryptText from '@/components/DecryptText'

export default function About() {
  const [mainTab, setMainTab] = useState<'synthetics' | 'author'>('synthetics')
  const [syntheticsTab, setSyntheticsTab] = useState<'lore' | 'factions' | 'mechanics' | 'art'>('lore')

  const skills = [
    { name: 'Unity', level: 95 },
    { name: 'Unreal Engine', level: 85 },
    { name: 'C++', level: 90 },
    { name: 'C#', level: 95 },
    { name: 'Game Design', level: 88 },
    { name: 'Multiplayer Systems', level: 82 },
  ]

  const experience = [
    {
      year: '2024',
      title: 'Senior Game Developer',
      company: 'Indie Studio',
      description: 'Leading development of innovative multiplayer experiences',
    },
    {
      year: '2022',
      title: 'Game Developer',
      company: 'Tech Company',
      description: 'Developed core gameplay systems and tools',
    },
    {
      year: '2020',
      title: 'Junior Developer',
      company: 'Game Studio',
      description: 'Started journey in professional game development',
    },
  ]

  const factions = [
    {
      name: 'The Ascendancy',
      description: 'Elite human faction seeking to merge with technology and achieve digital transcendence.',
      color: 'text-neon-cyan',
    },
    {
      name: 'The Remnants',
      description: 'Survivors of the old world fighting to preserve humanity\'s organic nature.',
      color: 'text-orange-500',
    },
    {
      name: 'The Synthetics',
      description: 'Advanced AI-driven entities with their own consciousness and agenda.',
      color: 'text-neon-green',
    },
    {
      name: 'The Void Walkers',
      description: 'Mysterious beings who exist between dimensions, manipulating reality itself.',
      color: 'text-purple-500',
    },
  ]

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-neon-green text-glow">ABOUT</span>
            </h1>
            <div className="w-24 h-1 bg-neon-green mx-auto mb-8" />
          </motion.div>

          {/* Main Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center gap-4 mb-12"
          >
            <button
              onClick={() => setMainTab('synthetics')}
              className={`px-8 py-3 font-bold tracking-wider transition-all ${
                mainTab === 'synthetics'
                  ? 'bg-neon-green text-black'
                  : 'bg-transparent neon-border text-neon-green hover:bg-neon-green/10'
              }`}
            >
              ABOUT SYNTHETICS
            </button>
            <button
              onClick={() => setMainTab('author')}
              className={`px-8 py-3 font-bold tracking-wider transition-all ${
                mainTab === 'author'
                  ? 'bg-neon-green text-black'
                  : 'bg-transparent neon-border text-neon-green hover:bg-neon-green/10'
              }`}
            >
              ABOUT THE AUTHOR
            </button>
          </motion.div>
        </div>
      </section>

      {/* Tab Content */}
      {mainTab === 'synthetics' ? (
        <div>
          {/* Synthetics Sub-Tabs */}
          <section className="px-4 mb-12">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {['lore', 'factions', 'mechanics', 'art'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSyntheticsTab(tab as any)}
                    className={`px-6 py-2 font-semibold tracking-wider transition-all ${
                      syntheticsTab === tab
                        ? 'bg-neon-green text-black'
                        : 'bg-transparent neon-border text-neon-green hover:bg-neon-green/10'
                    }`}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </motion.div>
            </div>
          </section>

          {/* Synthetics Content */}
          <section className="px-4 pb-20">
            <div className="max-w-6xl mx-auto">
              <motion.div
                key={syntheticsTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {syntheticsTab === 'lore' && (
                  <div className="space-y-8">
                    <div className="bg-dark-card neon-border p-8">
                      <h2 className="text-3xl font-bold text-neon-green mb-6">THE WORLD OF SYNTHETICS</h2>
                      <div className="space-y-4 text-gray-300 leading-relaxed">
                        <p>
                          In the year 2147, humanity stands at a crossroads. The creation of sentient artificial
                          intelligence has blurred the line between human and machine, organic and synthetic.
                        </p>
                        <p>
                          The world is divided among those who embrace technological enhancement, those who resist
                          it, and the mysterious Synthetics themselves—beings of pure consciousness existing in
                          quantum superposition between the physical and digital realms.
                        </p>
                        <p>
                          Players navigate this fractured world, choosing allegiances, making impossible decisions,
                          and ultimately deciding the fate of both humanity and its synthetic offspring.
                        </p>
                      </div>
                    </div>

                    <div className="bg-dark-card neon-border p-8 scan-line">
                      <h3 className="text-2xl font-bold text-neon-green mb-4">KEY EVENTS</h3>
                      <div className="space-y-4">
                        <div className="border-l-2 border-neon-green pl-4">
                          <div className="text-sm text-gray-500 mb-1">2087 - The Awakening</div>
                          <p className="text-gray-300">First confirmed instance of artificial consciousness</p>
                        </div>
                        <div className="border-l-2 border-neon-cyan pl-4">
                          <div className="text-sm text-gray-500 mb-1">2112 - The Schism</div>
                          <p className="text-gray-300">Humanity splits into pro- and anti-technology factions</p>
                        </div>
                        <div className="border-l-2 border-purple-500 pl-4">
                          <div className="text-sm text-gray-500 mb-1">2139 - The Void Opens</div>
                          <p className="text-gray-300">Discovery of interdimensional rifts and the Void Walkers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {syntheticsTab === 'factions' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {factions.map((faction, index) => (
                      <motion.div
                        key={faction.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-dark-card neon-border p-6 scan-line"
                      >
                        <h3 className={`text-2xl font-bold mb-3 ${faction.color}`}>
                          {faction.name}
                        </h3>
                        <p className="text-gray-400 leading-relaxed mb-4">{faction.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <div className={`w-3 h-3 rounded-full ${faction.color.replace('text-', 'bg-')}`} />
                          <span>Playable Faction</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                {syntheticsTab === 'mechanics' && (
                  <div className="space-y-6">
                    <div className="bg-dark-card neon-border p-8">
                      <h2 className="text-3xl font-bold text-neon-green mb-6">CORE GAMEPLAY MECHANICS</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-xl font-bold text-neon-cyan mb-3">Quantum Shifting</h4>
                          <p className="text-gray-400 mb-4">
                            Manipulate probability fields to shift between alternate realities,
                            creating tactical advantages and solving environmental puzzles.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-xs bg-dark-bg text-gray-400 border border-neon-cyan/30">
                              Phase Shift
                            </span>
                            <span className="px-3 py-1 text-xs bg-dark-bg text-gray-400 border border-neon-cyan/30">
                              Temporal Echo
                            </span>
                            <span className="px-3 py-1 text-xs bg-dark-bg text-gray-400 border border-neon-cyan/30">
                              Reality Fracture
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-neon-cyan mb-3">Neural Hacking</h4>
                          <p className="text-gray-400 mb-4">
                            Interface directly with digital systems and synthetic minds,
                            bypassing security and manipulating AI behavior.
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 text-xs bg-dark-bg text-gray-400 border border-neon-cyan/30">
                              Mind Jack
                            </span>
                            <span className="px-3 py-1 text-xs bg-dark-bg text-gray-400 border border-neon-cyan/30">
                              Data Siphon
                            </span>
                            <span className="px-3 py-1 text-xs bg-dark-bg text-gray-400 border border-neon-cyan/30">
                              System Override
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-neon-cyan mb-3">Faction Alignment</h4>
                          <p className="text-gray-400 mb-4">
                            Your choices affect faction relationships, unlocking unique abilities,
                            storylines, and ending paths.
                          </p>
                        </div>

                        <div>
                          <h4 className="text-xl font-bold text-neon-cyan mb-3">Multiplayer Warfare</h4>
                          <p className="text-gray-400 mb-4">
                            Team-based tactical combat with asymmetric faction abilities and
                            dynamic objective-based gameplay.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {syntheticsTab === 'art' && (
                  <div className="space-y-6">
                    <div className="bg-dark-card neon-border p-8 text-center">
                      <h2 className="text-3xl font-bold text-neon-green mb-6">CONCEPT ART GALLERY</h2>
                      <p className="text-gray-400 mb-8">Placeholder - Concept art coming soon</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                          <div
                            key={item}
                            className="aspect-video bg-dark-bg neon-border flex items-center justify-center group hover:bg-neon-green/5 transition-colors"
                          >
                            <div className="text-center">
                              <div className="text-4xl mb-2">🎨</div>
                              <div className="text-sm text-gray-500">Concept Art #{item}</div>
                              <div className="text-xs text-gray-600 mt-1">Coming Soon</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-dark-card neon-border p-6">
                      <p className="text-gray-400 text-center text-sm">
                        💡 Upload your concept art images to the project to display them here
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </section>
        </div>
      ) : (
        /* Author Tab Content */
        <div>
          {/* Interactive Terminal */}
          <section className="relative py-12 px-4">
            <div className="max-w-6xl mx-auto mb-16">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-8"
              >
                <DecryptText
                  text=">>>_ACCESS.DEVELOPER_PROFILE"
                  className="text-2xl md:text-3xl font-bold text-crimson-bright text-glow code-font"
                  as="h2"
                  speed={35}
                />
                <p className="text-gray-400 mt-4 code-font text-sm">
                  <DecryptText
                    text="type.help.for.available.commands"
                    as="span"
                    speed={25}
                  />
                </p>
              </motion.div>
              <Terminal />
            </div>
          </section>

          <section className="relative py-12 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-dark-card neon-border p-8 md:p-12 mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-crimson-bright code-font">
                  <DecryptText text="MISSION_STATEMENT" as="span" speed={35} />
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-4 code-font">
                  I'm a passionate game developer dedicated to creating immersive and innovative gaming experiences.
                  With expertise spanning multiple engines and programming languages, I focus on building games that
                  push technical boundaries while maintaining engaging gameplay.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed code-font">
                  My approach combines technical excellence with creative vision, ensuring every project delivers
                  both performance and player satisfaction. I specialize in multiplayer systems, custom engine
                  development, and gameplay programming.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Skills Section */}
          <section className="py-20 px-4 bg-dark-card/30">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-neon-green text-center"
              >
                TECHNICAL SKILLS
              </motion.h2>

              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 font-semibold tracking-wider">{skill.name}</span>
                      <span className="text-neon-green">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-dark-bg rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        className="h-full bg-gradient-to-r from-neon-green to-neon-cyan relative"
                      >
                        <div className="absolute inset-0 bg-neon-green/50 animate-pulse-slow" />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Experience Timeline */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-12 text-neon-green text-center"
              >
                EXPERIENCE TIMELINE
              </motion.h2>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-px bg-neon-green/30 hidden md:block" />

                <div className="space-y-12">
                  {experience.map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-0 md:pl-20"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-6 top-2 w-4 h-4 bg-neon-green rounded-full border-4 border-dark-bg hidden md:block" />

                      <div className="bg-dark-card neon-border p-6 scan-line">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                          <h3 className="text-xl font-bold text-neon-green">{item.title}</h3>
                          <span className="text-gray-400 text-sm tracking-wider">{item.year}</span>
                        </div>
                        <p className="text-gray-300 font-semibold mb-2">{item.company}</p>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
