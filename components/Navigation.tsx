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

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] bg-dark-bg/90 backdrop-blur-md border-b border-crimson/30">
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
              className="relative z-[9999] inline-flex items-center justify-center gap-2 px-3 py-2 border border-crimson/50 bg-[#0a0e14] text-crimson-bright code-font text-xs font-bold tracking-widest focus:outline-none"
              style={{ boxShadow: '0 0 16px rgba(196, 30, 58, 0.4), inset 0 0 8px rgba(196, 30, 58, 0.08)' }}
              whileHover={{ scale: 1.04, boxShadow: '0 0 20px rgba(196, 30, 58, 0.7), inset 0 0 12px rgba(196, 30, 58, 0.15)' }}
              whileTap={{ scale: 0.96 }}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <div className={`${isOpen ? 'hidden' : 'flex'} flex-col gap-1 w-4`}>
                <motion.span
                  className="w-full h-[2px] bg-crimson-bright"
                  style={{ boxShadow: '0 0 6px rgba(196, 30, 58, 0.8)' }}
                  animate={{ scaleX: [1, 0.8, 1], x: [0, 2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.span
                  className="w-full h-[2px] bg-crimson-bright"
                  style={{ boxShadow: '0 0 6px rgba(196, 30, 58, 0.8)' }}
                  animate={{ scaleX: [1, 0.95, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                />
                <motion.span
                  className="w-full h-[2px] bg-crimson-bright"
                  style={{ boxShadow: '0 0 6px rgba(196, 30, 58, 0.8)' }}
                  animate={{ scaleX: [1, 0.85, 1], x: [0, -2, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                />
              </div>
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-4 w-4`}
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="text-[10px]">{isOpen ? 'CLOSE' : 'MENU'}</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Right Side Widget */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998] lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Side Widget */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 250 }}
              className="fixed right-0 top-0 bottom-12 w-[min(85vw,380px)] bg-[#020305] border-l-2 border-crimson/40 z-[9999] lg:hidden overflow-hidden flex flex-col"
              style={{ boxShadow: '-8px 0 48px rgba(0, 0, 0, 0.9), -2px 0 16px rgba(196, 30, 58, 0.3)' }}
              id="mobile-menu"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-crimson/30 bg-[#03050a]">
                <div className="text-[10px] tracking-[0.4em] text-gray-600 code-font">NAV.SYSTEM</div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 border border-crimson/50 bg-crimson/10 text-crimson-bright text-xs code-font tracking-widest hover:bg-crimson/20 transition-colors"
                >
                  <svg className="h-3.5 w-3.5" stroke="currentColor" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>CLOSE</span>
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 custom-scrollbar">
                {navItems.map((item, index) => {
                  const isActive = pathname === item.path
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.06 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 border transition-all code-font text-sm tracking-wider ${
                          isActive
                            ? 'border-crimson/60 bg-crimson/10 text-crimson-bright shadow-[inset_0_0_12px_rgba(196,30,58,0.15)]'
                            : 'border-crimson/25 bg-[#05080d]/80 text-gray-400 hover:border-crimson/50 hover:text-crimson-bright hover:bg-[#080c12]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{item.name}</span>
                          {isActive && (
                            <span className="text-[10px] text-crimson-bright/70">ACTIVE</span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}
              </div>

              {/* Footer Status */}
              <div className="border-t border-crimson/30 px-4 py-3 bg-[#03050a] text-[9px] code-font text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>STATUS</span>
                  <span className="text-crimson-bright">ONLINE</span>
                </div>
                <div className="flex justify-between">
                  <span>MODE</span>
                  <span className="text-gray-500">MOBILE.WIDGET</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(10, 14, 20, 0.3);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(196, 30, 58, 0.4);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(196, 30, 58, 0.6);
        }
      `}</style>
    </nav>
  )
}
