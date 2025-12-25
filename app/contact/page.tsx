'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import DecryptText from '@/components/DecryptText'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    isBusinessEnquiry: true,
    subject: '',
    message: '',
  })

  const [status, setStatus] = useState('')
  const [glitchText, setGlitchText] = useState('ESTABLISHING.COMM_CHANNEL')
  const [systemStatus, setSystemStatus] = useState<'failing' | 'rerouting' | 'active'>('failing')
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorVisible, setCursorVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<'transmit' | 'handshake'>('transmit')
  const [tunnelActive, setTunnelActive] = useState(true)
  const [tunnelProgress, setTunnelProgress] = useState(0)
  const [showModal, setShowModal] = useState(false)

  // Simulate system recovery
  useEffect(() => {
    const timer1 = setTimeout(() => setSystemStatus('rerouting'), 2000)
    const timer2 = setTimeout(() => setSystemStatus('active'), 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  useEffect(() => {
    setTunnelActive(true)
    setShowModal(false)
    setTunnelProgress(0)

    let progress = 0
    const progressTimer = setInterval(() => {
      progress = Math.min(100, progress + 7)
      setTunnelProgress(progress)
      if (progress >= 100) {
        clearInterval(progressTimer)
        setTimeout(() => {
          setTunnelActive(false)
          setShowModal(true)
        }, 350)
      }
    }, 120)

    return () => {
      clearInterval(progressTimer)
    }
  }, [])

  // Random glitch effect on title
  useEffect(() => {
    const glitchMessages = [
      'ESTABLISHING.COMM_CHANNEL',
      'E$T@BL!SH1NG.C0MM_CH@NNEL',
      'ESTABLISHING.COMM_CHANNEL',
      '3ST4BL1SH1NG.C0MM_CH4NN3L'
    ]

    const interval = setInterval(() => {
      setGlitchText(glitchMessages[Math.floor(Math.random() * glitchMessages.length)])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('[SUCCESS] Message queued for transmission...')
    setTimeout(() => {
      setStatus('[CONFIRMED] Transmission successful. Expect response within 24-48 hours.')
    }, 1500)
    setTimeout(() => setStatus(''), 8000)
    setFormData({ name: '', email: '', isBusinessEnquiry: true, subject: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setCursorPosition({ x: e.clientX, y: e.clientY })
    if (!cursorVisible) {
      setCursorVisible(true)
    }
  }

  const handleMouseLeave = () => {
    setCursorVisible(false)
  }

  return (
    <div
      className="min-h-screen pt-16 overflow-hidden relative custom-cursor"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Maintenance Warning Banner */}
      <AnimatePresence>
        {systemStatus === 'failing' && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-16 left-0 right-0 z-50 bg-red-600/90 border-b-2 border-red-400 py-3 px-4"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 code-font">
              <div className="w-3 h-3 bg-white rounded-full" />
              <span className="text-white font-bold tracking-wider">
                [CRITICAL] COMMUNICATION ARRAY OFFLINE - REROUTING TO BACKUP SERVERS...
              </span>
            </div>
          </motion.div>
        )}

        {systemStatus === 'rerouting' && (
          <motion.div
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            exit={{ y: -100 }}
            className="fixed top-16 left-0 right-0 z-50 bg-orange-600/90 border-b-2 border-orange-400 py-3 px-4"
          >
            <div className="max-w-6xl mx-auto flex items-center justify-center gap-3 code-font">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 border-2 border-white border-t-transparent rounded-full"
              />
              <span className="text-white font-bold tracking-wider">
                [WARN] SWITCHING TO EMERGENCY PROTOCOL - STANDBY...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Static scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-10 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255, 255, 255, 0.05) 3px, rgba(255, 255, 255, 0.05) 4px)'
        }}
      />

      {/* Main Content */}
      <section className="relative h-[calc(100vh-4rem)] px-4 py-4 md:py-6 z-20">
        <div className="max-w-5xl mx-auto h-full flex flex-col">
          {/* Glitchy Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-4"
          >
            <motion.h1
              key={glitchText}
              className="text-3xl md:text-5xl font-bold mb-3 code-font text-crimson-bright"
              style={{
                textShadow: systemStatus === 'failing' ? '2px 2px 8px rgba(255, 0, 0, 0.8)' : '0 0 10px rgba(196, 30, 58, 0.6)'
              }}
            >
              {glitchText}
            </motion.h1>

            {systemStatus === 'active' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm md:text-base text-gray-400 code-font"
              >
                <DecryptText
                  text="emergency.backup.communications.online"
                  as="span"
                  speed={25}
                />
              </motion.p>
            )}

            {/* Horizontal tech line */}
            <motion.div
              className="relative w-full h-px bg-crimson/30 mt-6 md:mt-8 overflow-hidden"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-crimson-bright to-transparent"
              />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {tunnelActive && (
              <motion.div
                key="tunnel-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-[70] bg-[#06080b]/90 backdrop-blur-sm flex items-center justify-center"
              >
                <div className="relative w-full max-w-md px-6">
                  <div className="absolute inset-0 rounded-full blur-3xl bg-crimson/20" />
                  <div className="relative border border-crimson/30 bg-[#0b0f14] p-6 text-center code-font">
                    <div className="text-xs text-gray-500 tracking-[0.35em] mb-3">ESTABLISHING.TUNNEL</div>
                    <div className="relative mx-auto w-40 h-40">
                      <motion.div
                        className="absolute inset-0 rounded-full border border-crimson/40"
                        animate={{ scale: [1, 1.2], opacity: [0.6, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="absolute inset-6 rounded-full border border-crimson/30"
                        animate={{ scale: [1, 1.25], opacity: [0.5, 0.15] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut', delay: 0.2 }}
                      />
                      <motion.div
                        className="absolute inset-10 rounded-full border border-crimson/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-2xl text-crimson-bright">{tunnelProgress}%</div>
                      </div>
                    </div>
                    <div className="mt-4 h-1 bg-[#0a0e14] border border-crimson/30 overflow-hidden">
                      <motion.div
                        className="h-full bg-crimson-bright"
                        animate={{ width: `${tunnelProgress}%` }}
                        transition={{ duration: 0.2, ease: 'linear' }}
                      />
                    </div>
                    <div className="mt-3 text-xs text-gray-500">SECURE.LINK.ROUTING...</div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showModal && (
              <motion.div
                key="contact-modal"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="relative z-30 flex-1 flex items-center justify-center"
              >
                <div className="w-full max-w-3xl border border-crimson/30 bg-[#080b10]/95 p-5 md:p-6 relative overflow-hidden shadow-[0_0_40px_rgba(196,30,58,0.25)]">
                  <div className="absolute inset-0 opacity-40 bg-[linear-gradient(transparent_0px,rgba(255,255,255,0.04)_1px,transparent_2px)] bg-[length:100%_5px]" />
                  <div className="relative">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                      <div className="text-xs code-font text-gray-500 tracking-widest">SECURE.CONTACT.TERMINAL</div>
                      <div className="flex items-center gap-2 text-[10px] code-font text-gray-500">
                        <span className="px-2 py-1 border border-crimson/30 bg-[#0a0e14]">AES-256</span>
                        <span className="px-2 py-1 border border-crimson/30 bg-[#0a0e14]">TUNNEL-07</span>
                        <span className="px-2 py-1 border border-crimson/30 bg-[#0a0e14] text-crimson-bright">LIVE</span>
                      </div>
                    </div>

                    <div className="flex justify-center mb-4">
                      <div className="inline-flex gap-2 border border-crimson/20 bg-[#0b0f14] p-1 code-font text-xs">
                        {[
                          { id: 'transmit', label: 'TRANSMIT' },
                          { id: 'handshake', label: 'HANDSHAKE' },
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'transmit' | 'handshake')}
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

                    {activeTab === 'transmit' ? (
                      <div className="space-y-4">
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label htmlFor="name" className="block text-[10px] md:text-xs font-semibold text-gray-500 mb-2 tracking-wider code-font">
                                &gt; IDENTIFICATION_
                              </label>
                              <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-[#0b0d11] border border-crimson/30 text-gray-300 focus:border-crimson-bright focus:outline-none transition-all code-font placeholder-gray-600 text-xs"
                                placeholder="Enter designation..."
                                style={{
                                  boxShadow: formData.name ? '0 0 10px rgba(196, 30, 58, 0.2)' : 'none'
                                }}
                              />
                            </div>

                            <div>
                              <label htmlFor="email" className="block text-[10px] md:text-xs font-semibold text-gray-500 mb-2 tracking-wider code-font">
                                &gt; SECURE_CHANNEL_ADDRESS_
                              </label>
                              <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-3 py-2 bg-[#0b0d11] border border-crimson/30 text-gray-300 focus:border-crimson-bright focus:outline-none transition-all code-font placeholder-gray-600 text-xs"
                                placeholder="encrypted@comms.channel"
                                style={{
                                  boxShadow: formData.email ? '0 0 10px rgba(196, 30, 58, 0.2)' : 'none'
                                }}
                              />
                            </div>
                          </div>

                          <div>
                            <label htmlFor="subject" className="block text-[10px] md:text-xs font-semibold text-gray-500 mb-2 tracking-wider code-font">
                              &gt; SUBJECT_LINE_
                            </label>
                            <input
                              type="text"
                              id="subject"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full px-3 py-2 bg-[#0b0d11] border border-crimson/30 text-gray-300 focus:border-crimson-bright focus:outline-none transition-all code-font placeholder-gray-600 text-xs"
                              placeholder="Mission briefing..."
                              style={{
                                boxShadow: formData.subject ? '0 0 10px rgba(196, 30, 58, 0.2)' : 'none'
                              }}
                            />
                          </div>

                          <div>
                            <label htmlFor="message" className="block text-[10px] md:text-xs font-semibold text-gray-500 mb-2 tracking-wider code-font">
                              &gt; ENCRYPTED_PAYLOAD_
                            </label>
                            <textarea
                              id="message"
                              name="message"
                              value={formData.message}
                              onChange={handleChange}
                              required
                              rows={4}
                              className="w-full px-3 py-2 bg-[#0b0d11] border border-crimson/30 text-gray-300 focus:border-crimson-bright focus:outline-none transition-all resize-none code-font placeholder-gray-600 text-xs"
                              placeholder="Begin transmission..."
                              style={{
                                boxShadow: formData.message ? '0 0 10px rgba(196, 30, 58, 0.2)' : 'none'
                              }}
                            />
                          </div>

                          <div className="h-px bg-gradient-to-r from-transparent via-crimson/40 to-transparent" />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, isBusinessEnquiry: true })}
                              className={`px-3 py-2 border transition-all code-font text-xs font-semibold ${
                                formData.isBusinessEnquiry
                                  ? 'border-crimson-bright bg-crimson/20 text-crimson-bright shadow-lg shadow-crimson/30'
                                  : 'border-crimson/30 bg-[#0b0d11] text-gray-500 hover:border-crimson/50'
                              }`}
                            >
                              <span className="block">BUSINESS</span>
                              <span className="text-[10px] opacity-60">Collaboration / Partnership</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, isBusinessEnquiry: false })}
                              className={`px-3 py-2 border transition-all code-font text-xs font-semibold ${
                                !formData.isBusinessEnquiry
                                  ? 'border-crimson-bright bg-crimson/20 text-crimson-bright shadow-lg shadow-crimson/30'
                                  : 'border-crimson/30 bg-[#0b0d11] text-gray-500 hover:border-crimson/50'
                              }`}
                            >
                              <span className="block">PERSONAL</span>
                              <span className="text-[10px] opacity-60">General Inquiry</span>
                            </button>
                          </div>

                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full px-6 py-3 bg-crimson border-2 border-crimson-bright text-white font-bold tracking-wider transition-all code-font relative overflow-hidden group text-xs md:text-sm"
                            style={{
                              boxShadow: '0 0 20px rgba(196, 30, 58, 0.4)'
                            }}
                          >
                            <span className="relative z-10">INITIATE.TRANSMISSION_</span>
                            <motion.div
                              className="absolute inset-0 bg-crimson-bright"
                              initial={{ x: '-100%' }}
                              whileHover={{ x: 0 }}
                              transition={{ duration: 0.3 }}
                            />
                          </motion.button>

                          <AnimatePresence>
                            {status && (
                              <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className="p-3 bg-crimson/10 border-2 border-crimson/40 code-font text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-crimson-bright rounded-full" />
                                  <span className="text-crimson-bright">{status}</span>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </form>

                        <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] code-font text-gray-600">
                          <div className="flex items-center gap-2">
                            <span>[ENCRYPTION: AES-256]</span>
                            <span className="hidden md:inline">|</span>
                            <span>[PROTOCOL: SECURE]</span>
                          </div>
                          <div className="text-crimson-bright">SECURE.LINK.ACTIVE</div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center justify-between border-b border-crimson/20 pb-3">
                          <span className="text-xs code-font text-gray-500">HANDSHAKE.PROTOCOL</span>
                          <span className="text-xs code-font text-crimson-bright">SECURE</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {[
                            { label: 'ROUTE', value: 'TUNNEL-07' },
                            { label: 'LATENCY', value: '38ms' },
                            { label: 'CIPHER', value: 'AES-256' },
                            { label: 'STATUS', value: systemStatus.toUpperCase() },
                          ].map((item) => (
                            <div key={item.label} className="border border-crimson/20 bg-[#0a0e14] p-3 text-center">
                              <div className="text-[10px] text-gray-600 code-font tracking-widest">{item.label}</div>
                              <div className="text-xs md:text-sm text-crimson-bright code-font mt-2">{item.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="border border-crimson/20 bg-[#0b0f14] p-4 text-xs code-font text-gray-500 space-y-2">
                          <div>[TRACE] Establishing encrypted channel...</div>
                          <div>[TRACE] Multiplexing route packets...</div>
                          <div>[TRACE] Validating handshake keys...</div>
                          <div>[TRACE] Awaiting transmission payload...</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* Custom cursor */}
      <motion.div
        className="pointer-events-none fixed z-[60] w-8 h-8 border border-crimson-bright/60 rounded-full"
        animate={{
          x: cursorPosition.x - 16,
          y: cursorPosition.y - 16,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 450, damping: 30 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[60] w-2 h-2 bg-crimson-bright rounded-full"
        animate={{
          x: cursorPosition.x - 4,
          y: cursorPosition.y - 4,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 35 }}
      />

      {/* Custom cursor styles */}
      <style jsx>{`
        .custom-cursor {
          cursor: none;
        }
        .custom-cursor input,
        .custom-cursor textarea,
        .custom-cursor button {
          cursor: none;
        }
      `}</style>
    </div>
  )
}
