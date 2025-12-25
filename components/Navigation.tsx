'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DecryptText from './DecryptText'

const navItems = [
  { name: 'HOME', path: '/' },
  { name: 'ABOUT', path: '/about' },
  { name: 'DEVELOPMENT', path: '/development' },
  { name: 'CONCEPT_ART', path: '/concept-art' },
  { name: 'CONTACT', path: '/contact' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-md border-b border-crimson/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="text-crimson-bright font-bold text-xl tracking-wider hover:text-glow transition-all code-font group"
          >
            <span className="group-hover:hidden">SYNTHETIX.WORLD</span>
            <span className="hidden group-hover:inline-block">
              <DecryptText text="SYNTHETIX.WORLD" as="span" speed={25} />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 text-sm font-medium tracking-wider transition-all relative group code-font
                    ${pathname === item.path
                      ? 'text-crimson-bright'
                      : 'text-gray-400 hover:text-crimson-bright'
                    }`}
                >
                  <DecryptText
                    text={item.name}
                    as="span"
                    speed={35}
                  />
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-crimson-bright transform origin-left transition-transform duration-300
                    ${pathname === item.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                  `} />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="relative z-[9999] inline-flex items-center justify-center px-4 py-2.5 border-2 border-crimson-bright bg-[#1a1f2e] text-crimson-bright code-font text-sm font-bold tracking-wider focus:outline-none shadow-lg"
              style={{ boxShadow: '0 0 20px rgba(196, 30, 58, 0.6), inset 0 0 10px rgba(196, 30, 58, 0.1)' }}
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(196, 30, 58, 0.9), inset 0 0 15px rgba(196, 30, 58, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className={`${isOpen ? 'hidden' : 'flex'} flex-col gap-1.5 mr-2.5`}>
                <motion.span
                  className="w-5 h-0.5 bg-crimson-bright shadow-[0_0_4px_rgba(196,30,58,0.8)]"
                  animate={{ scaleX: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-crimson-bright shadow-[0_0_4px_rgba(196,30,58,0.8)]"
                  animate={{ scaleX: [1, 0.9, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.span
                  className="w-5 h-0.5 bg-crimson-bright shadow-[0_0_4px_rgba(196,30,58,0.8)]"
                  animate={{ scaleX: [1, 0.8, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
              </span>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-5 w-5 mr-2`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="3"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Terminal-style Mobile Menu Side Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Semi-transparent backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Side Menu Widget */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="fixed right-0 top-16 bottom-0 w-[85vw] max-w-sm bg-[#0a0e14] border-l-2 border-crimson/50 z-[9999] lg:hidden overflow-hidden"
              style={{ boxShadow: '-5px 0 40px rgba(196, 30, 58, 0.4)' }}
              id="mobile-menu"
            >
              {/* Background with animated grid */}
              <div className="absolute inset-0 bg-[#07090c]">
                {/* Animated grid pattern */}
                <motion.div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'linear-gradient(rgba(196, 30, 58, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 30, 58, 0.15) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                  }}
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Scanning line effect */}
                <motion.div
                  className="absolute inset-x-0 h-px bg-crimson-bright"
                  style={{ boxShadow: '0 0 20px rgba(196, 30, 58, 0.8)' }}
                  animate={{ y: ['0%', '100%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                />

                {/* Particle noise overlay */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")'
                  }}
                />
              </div>

              {/* Content Container */}
              <div className="relative h-full flex flex-col">
                {/* Prominent Close Button */}
                <div className="absolute top-3 right-3 z-10">
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 bg-crimson/90 hover:bg-crimson border-2 border-crimson-bright text-white code-font text-xs font-bold tracking-wider transition-all touch-manipulation"
                    style={{ boxShadow: '0 0 15px rgba(196, 30, 58, 0.6)' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <svg className="h-4 w-4" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>CLOSE</span>
                  </motion.button>
                </div>

                {/* Terminal Header */}
                <div className="border-b-2 border-crimson/30 p-4 bg-[#07090c]">
                  <div className="flex items-start justify-between mb-3 pr-20">
                    <div className="code-font text-crimson-bright text-sm font-bold tracking-wider">
                      <DecryptText text="SYSTEM.NAVIGATION" as="span" speed={40} />
                    </div>
                  </div>

                {/* System Status Indicators */}
                <div className="flex gap-4 text-xs code-font">
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-green-500">ONLINE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-2 h-2 bg-crimson-bright rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-crimson-bright">SECURE</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <motion.div
                      className="w-2 h-2 bg-cyan-400 rounded-full"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <span className="text-cyan-400">CONNECTED</span>
                  </div>
                  </div>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.path
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block relative group`}
                        >
                          {/* Terminal prompt indicator */}
                          <div className="flex items-center gap-2 p-3 border border-crimson/20 hover:border-crimson/50 transition-all bg-[#0a0e14]/50 hover:bg-[#0a0e14] group touch-manipulation">
                            <span className="code-font text-crimson-bright text-sm">▸</span>
                            <span className={`code-font tracking-wider text-sm font-medium transition-all ${
                              isActive
                                ? 'text-crimson-bright'
                                : 'text-gray-400 group-hover:text-crimson-bright'
                            }`}>
                              <DecryptText text={item.name} as="span" speed={30} />
                            </span>

                            {/* Active indicator */}
                            {isActive && (
                              <motion.div
                                layoutId="activeIndicator"
                                className="ml-auto px-2 py-0.5 bg-crimson/20 border border-crimson/50 text-crimson-bright text-xs code-font"
                                style={{ boxShadow: '0 0 10px rgba(196, 30, 58, 0.3)' }}
                              >
                                ACTIVE
                              </motion.div>
                            )}
                          </div>

                          {/* Hover glow effect */}
                          <div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                            style={{
                              boxShadow: 'inset 0 0 20px rgba(196, 30, 58, 0.1)'
                            }}
                          />
                        </Link>
                    </motion.div>
                  )
                })}
                </div>

                {/* Terminal Footer */}
                <div className="border-t-2 border-crimson/30 p-4 bg-[#07090c]">
                  <div className="code-font text-xs text-gray-600 space-y-1">
                    <div className="flex justify-between">
                      <span>SYSTEM.VERSION</span>
                      <span className="text-crimson-bright">v2.5.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span>UPTIME</span>
                      <span className="text-green-500">99.98%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>PROTOCOL</span>
                      <span className="text-cyan-400">SECURE.TLS</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  )
}
