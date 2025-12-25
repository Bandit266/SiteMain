'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import DecryptText from './DecryptText'

const loadingMessages = [
  'ACCESSING.DATABASE',
  'DECRYPTING.FILES',
  'LOADING.ASSETS',
  'INITIALIZING.PROTOCOL',
  'ESTABLISHING.CONNECTION',
  'BYPASSING.SECURITY',
  'COMPILING.DATA',
]

export default function PageTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState(loadingMessages[0])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setIsLoading(true)
    setProgress(0)

    // Random loading message
    setLoadingMessage(loadingMessages[Math.floor(Math.random() * loadingMessages.length)])

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 30
      })
    }, 150)

    // Hide loader after animation
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1200)

    return () => {
      clearTimeout(timer)
      clearInterval(progressInterval)
    }
  }, [pathname])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          {/* Main Overlay */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute inset-0 bg-dark-bg origin-left"
          >
            {/* Glitch Lines */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.02,
                    ease: "easeInOut"
                  }}
                  className="absolute h-px bg-crimson-bright"
                  style={{
                    top: `${(i / 20) * 100}%`,
                    opacity: Math.random() * 0.5 + 0.3,
                  }}
                />
              ))}
            </div>

            {/* Center Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Loading Message */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="mb-8"
              >
                <DecryptText
                  text={`>>>${loadingMessage}`}
                  className="text-2xl md:text-4xl font-bold text-crimson-bright text-glow code-font"
                  as="div"
                  speed={20}
                />
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="w-64 md:w-96"
              >
                <div className="h-1 bg-dark-card border border-crimson/30 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${Math.min(progress, 100)}%` }}
                    className="h-full bg-crimson-bright relative"
                    style={{
                      boxShadow: '0 0 10px rgba(196, 30, 58, 0.8)',
                    }}
                  >
                    {/* Scanning effect */}
                    <motion.div
                      animate={{
                        x: ['0%', '100%'],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                    />
                  </motion.div>
                </div>
                <div className="flex justify-between mt-2 code-font text-xs text-gray-500">
                  <span>0%</span>
                  <motion.span
                    key={Math.floor(progress)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-crimson-bright"
                  >
                    {Math.floor(progress)}%
                  </motion.span>
                  <span>100%</span>
                </div>
              </motion.div>

              {/* Matrix-style Code Rain (subtle) */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                {[...Array(30)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: -100 }}
                    animate={{ y: window.innerHeight + 100 }}
                    transition={{
                      duration: 2 + Math.random() * 2,
                      repeat: Infinity,
                      delay: Math.random() * 2,
                      ease: 'linear',
                    }}
                    className="absolute text-crimson code-font text-xs"
                    style={{
                      left: `${Math.random() * 100}%`,
                    }}
                  >
                    {Array.from({ length: 10 }, () =>
                      String.fromCharCode(33 + Math.floor(Math.random() * 94))
                    ).join('')}
                  </motion.div>
                ))}
              </div>

              {/* Corner Brackets */}
              <div className="absolute inset-0 p-8 pointer-events-none">
                {/* Top Left */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-crimson-bright"
                />
                {/* Top Right */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: -20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-crimson-bright"
                />
                {/* Bottom Left */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-crimson-bright"
                />
                {/* Bottom Right */}
                <motion.div
                  initial={{ opacity: 0, x: 20, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-crimson-bright"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
