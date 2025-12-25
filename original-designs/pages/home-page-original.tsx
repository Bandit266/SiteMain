'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import ArmorAssembly from '@/components/ArmorAssembly'
import DecryptText from '@/components/DecryptText'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Full-screen Hero Section with Interactive Background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        {/* Animated Armor Assembly Background */}
        <ArmorAssembly />

        {/* Strong Vignette Effect */}
        <div className="vignette-strong absolute inset-0 z-10"></div>

        {/* Content */}
        <div className="max-w-6xl mx-auto text-center relative z-20">
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
            className="text-xl md:text-2xl text-gray-300 mb-16 max-w-3xl mx-auto code-font"
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
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <DecryptText
              text="SCROLL_TO_ASSEMBLE"
              className="text-xs text-gray-400 tracking-widest code-font"
              as="span"
              speed={30}
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-px h-12 bg-gradient-to-b from-crimson-bright to-transparent"
            />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-darker-teal">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold text-center mb-16 text-crimson-bright text-glow code-font"
          >
            <DecryptText
              text=">>>_EXPERTISE.DOMAINS"
              as="span"
              speed={40}
            />
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'GAME_DESIGN',
                description: 'creating.engaging_mechanics.and_compelling.player_experiences',
                icon: '🎮',
              },
              {
                title: 'ENGINE_DEVELOPMENT',
                description: 'building.custom_tools.and.optimizing.performance',
                icon: '⚙️',
              },
              {
                title: 'MULTIPLAYER_SYSTEMS',
                description: 'implementing.robust_networking.and.real-time.gameplay',
                icon: '🌐',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="group relative p-8 bg-dark-teal neon-border scan-line"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <DecryptText
                  text={item.title}
                  className="text-xl font-bold mb-3 text-crimson-bright group-hover:text-glow transition-all block code-font"
                  as="h3"
                  speed={40}
                />
                <DecryptText
                  text={item.description}
                  className="text-gray-300 leading-relaxed block code-font text-sm"
                  as="p"
                  speed={30}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
