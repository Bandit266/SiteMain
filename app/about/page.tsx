'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Terminal from '@/components/Terminal'
import DecryptText from '@/components/DecryptText'

export default function About() {
  const [activeTab, setActiveTab] = useState<'terminal' | 'snapshot'>('terminal')

  return (
    <div className="min-h-screen pt-16 overflow-hidden">
      <section className="relative h-[calc(100vh-4rem)] px-4 py-4 md:py-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-4 text-center"
          >
            <div className="text-xs md:text-sm text-gray-500 code-font tracking-[0.3em]">
              ARCHIVE.ACCESS.GRANTED
            </div>
          </motion.div>
          <div className="flex justify-center mb-4">
            <div className="inline-flex gap-2 border border-crimson/20 bg-[#0b0f14] p-1 code-font text-xs">
              {[
                { id: 'terminal', label: 'TERMINAL' },
                { id: 'snapshot', label: 'SNAPSHOT' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'terminal' | 'snapshot')}
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
            {activeTab === 'terminal' ? (
              <Terminal heightClass="h-[calc(100vh-20rem)] md:h-[calc(100vh-18rem)]" />
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="h-full border border-crimson/20 bg-[#0b0f14] p-5 md:p-6 flex flex-col justify-between"
              >
                <div>
                  <DecryptText
                    text=">>>_SIGNAL.SNAPSHOT"
                    className="text-lg md:text-2xl text-crimson-bright text-glow code-font mb-3"
                    as="h2"
                    speed={35}
                  />
                  <p className="text-xs md:text-sm text-gray-400 code-font max-w-2xl">
                    Systems online. Relay buffers stable. Archive access granted for core world systems and development logs.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { label: 'NODE.ID', value: 'D-77' },
                    { label: 'UPLINK', value: 'STABLE' },
                    { label: 'CACHE', value: '78%' },
                    { label: 'THREAT', value: 'LOW' },
                  ].map((item) => (
                    <div key={item.label} className="border border-crimson/20 bg-[#0a0e14] p-3 text-center">
                      <div className="text-[10px] text-gray-600 code-font tracking-widest">{item.label}</div>
                      <div className="text-sm md:text-base text-crimson-bright code-font mt-2">{item.value}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-[10px] md:text-xs text-gray-600 code-font">
                  <span>[TRACE] PACKETS: 12.8K</span>
                  <span>[MODE] ARCHIVE.READONLY</span>
                  <span>[CLOCK] UTC+00:00</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
