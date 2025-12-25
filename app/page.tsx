'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import ArmorAssembly from '@/components/ArmorAssembly'
import DecryptText from '@/components/DecryptText'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'core' | 'expertise'>('core')

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Full-screen Hero Section with Interactive Background */}
      <section className="relative h-[calc(100vh-4rem)] pt-16 flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Armor Assembly Background */}
        <ArmorAssembly />

        {/* Strong Vignette Effect */}
        <div className="vignette-strong absolute inset-0 z-10"></div>

        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight code-font">
              <DecryptText
                text="CRAFTING"
                className="text-gray-200 inline-block"
                as="span"
              />
              <br />
              <DecryptText
                text="IMMERSIVE_WORLDS"
                className="text-crimson-bright text-glow inline-block"
                as="span"
              />
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto code-font"
          >
            <DecryptText
              text="game_developer.specializing_in"
              className="inline-block"
              as="span"
            />
            <br />
            <DecryptText
              text="innovative_gameplay.mechanics"
              className="inline-block"
              as="span"
            />
            <br />
            <DecryptText
              text="and.cutting-edge.technology"
              className="inline-block"
              as="span"
            />
          </motion.p>

          <div className="flex justify-center mb-6">
            <div className="inline-flex gap-2 border border-crimson/20 bg-[#0b0f14] p-1 code-font text-xs">
              {[
                { id: 'core', label: 'CORE' },
                { id: 'expertise', label: 'EXPERTISE' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'core' | 'expertise')}
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

          {activeTab === 'core' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link
                href="/development"
                className="group relative px-8 py-4 bg-transparent neon-border text-crimson-bright font-semibold tracking-wider overflow-hidden code-font"
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
                className="px-8 py-4 bg-crimson text-white font-semibold tracking-wider hover:bg-crimson-bright transition-all hover:shadow-lg hover:shadow-crimson/50 code-font"
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {[
                {
                  title: 'GAME_DESIGN',
                  description: 'creating.engaging_mechanics.and_compelling.player_experiences',
                  icon: 'dYZr',
                },
                {
                  title: 'ENGINE_DEVELOPMENT',
                  description: 'building.custom_tools.and.optimizing.performance',
                  icon: 'ƒsT‹,?',
                },
                {
                  title: 'MULTIPLAYER_SYSTEMS',
                  description: 'implementing.robust_networking.and.real-time.gameplay',
                  icon: 'dYO?',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative p-5 bg-dark-teal neon-border scan-line"
                >
                  <div className="text-3xl mb-3">{item.icon}</div>
                  <DecryptText
                    text={item.title}
                    className="text-base font-bold mb-2 text-crimson-bright group-hover:text-glow transition-all block code-font"
                    as="h3"
                    speed={40}
                  />
                  <DecryptText
                    text={item.description}
                    className="text-gray-300 leading-relaxed block code-font text-xs"
                    as="p"
                    speed={30}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

