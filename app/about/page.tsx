'use client'

import { motion } from 'framer-motion'
import Terminal from '@/components/Terminal'

export default function About() {
  return (
    <div className="min-h-screen pt-16 overflow-hidden bg-[#05070a]">
      <section className="relative h-[calc(100vh-4rem)] px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center"
          >
            <div className="text-xs md:text-sm text-gray-600 code-font tracking-[0.3em] mb-1">
              ARCHIVE.ACCESS.GRANTED
            </div>
            <div className="text-[10px] text-crimson/40 code-font">
              ▸ SYNTHETIX.RELAY / NODE.D-77 / TERMINAL.v3.9.1
            </div>
          </motion.div>

          <div className="flex-1 min-h-0">
            <Terminal heightClass="h-[calc(100vh-14rem)] md:h-[calc(100vh-12rem)]" />
          </div>
        </div>
      </section>
    </div>
  )
}
