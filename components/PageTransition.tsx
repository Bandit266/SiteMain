'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

type LoadingLine = {
  text: string
  tone: 'primary' | 'muted' | 'code' | 'alert'
}

type TransitionVariant = 'bootSequence' | 'connection' | 'dataTransfer' | 'networkScan' | 'securityCheck' | 'compileBuild' | 'encryptionKey'

const getRandomVariant = (): TransitionVariant => {
  const variants: TransitionVariant[] = ['bootSequence', 'connection', 'dataTransfer', 'networkScan', 'securityCheck', 'compileBuild', 'encryptionKey']
  return variants[Math.floor(Math.random() * variants.length)]
}

const pageConfigs: Record<string, {
  primary: string
  secondary: string[]
  tertiary: string[]
  cppFunctions: string[]
  errors: string[]
}> = {
  '/': {
    primary: 'INITIALIZING.MAIN_SYSTEM',
    secondary: ['Establishing secure connection...', 'Loading core modules...'],
    tertiary: ['Bypassing firewall protocols...', 'Authenticating credentials...'],
    cppFunctions: ['void initSystem() { /* 0x2A4F */ }', 'int loadCore(uint64_t addr);'],
    errors: ['[WARN] Unauthorized access detected', '[ERROR] Security clearance insufficient - overriding...']
  },
  '/about': {
    primary: 'ACCESSING.WORLD_ARCHIVE',
    secondary: ['Indexing survival logs...', 'Syncing district control data...'],
    tertiary: ['Rebuilding faction ledger...', 'Calculating storm fronts...'],
    cppFunctions: ['scanWorld(sectorGrid);', 'routeSignal(RELAY_NODE);'],
    errors: ['[WARN] Archive drift detected - rebalancing...', '[ERROR] Zone map stale - reindexing...']
  },
  '/development': {
    primary: 'LOADING.ROADMAP_DATA',
    secondary: ['Compiling task schedules...', 'Synchronizing Gantt timelines...'],
    tertiary: ['Fetching repository data...', 'Building dependency graph...'],
    cppFunctions: ['void loadProjects() { /* 0x7FA2 */ }', 'int syncTimeline(projectID);', 'bool validateTasks(queue<Task>&);'],
    errors: ['[ERROR] Repository not found - cloning from backup...', '[WARN] Merge conflict detected - auto-resolving...']
  },
  '/concept-art': {
    primary: 'ACCESSING.VISUAL_ARCHIVES',
    secondary: ['Rendering high-resolution assets...', 'Loading faction galleries...'],
    tertiary: ['Decompressing texture cache...', 'Building image atlas...'],
    cppFunctions: ['renderImage(textureBuffer, 0x4K);', 'loadFactionData(FACTION_ALL);', 'void* allocVRAM(size_t bytes);'],
    errors: ['[ERROR] Texture cache corrupted - rebuilding...', '[WARN] GPU memory insufficient - compressing...']
  },
  '/contact': {
    primary: 'ESTABLISHING.COMM_CHANNEL',
    secondary: ['Communication array offline...', 'Rerouting through backup servers...'],
    tertiary: ['Repairing network protocols...', 'Emergency connection mode active...'],
    cppFunctions: ['connectSocket(PORT_443);', 'sendMessage(encryptedPayload);', 'bool reconnect(int retries);'],
    errors: ['[CRITICAL] Server unresponsive - restarting service...', '[ERROR] Connection timeout - switching protocol...', '[WARN] Maintenance mode active - forcing connection...']
  }
}

const buildLines = (config: (typeof pageConfigs)[keyof typeof pageConfigs]): LoadingLine[] => {
  const randomSecondary1 = config.secondary[Math.floor(Math.random() * config.secondary.length)]
  const randomSecondary2 = config.secondary[Math.floor(Math.random() * config.secondary.length)]
  const randomTertiary = config.tertiary[Math.floor(Math.random() * config.tertiary.length)]
  const randomFunction = config.cppFunctions[Math.floor(Math.random() * config.cppFunctions.length)]
  const randomError = config.errors[Math.floor(Math.random() * config.errors.length)]

  return [
    { text: `>>>${config.primary}`, tone: 'primary' },
    { text: randomSecondary1, tone: 'muted' },
    { text: randomFunction, tone: 'code' },
    { text: randomError, tone: 'alert' },
    { text: randomTertiary, tone: 'muted' },
    { text: randomSecondary2, tone: 'muted' },
  ]
}

const toneClass = (tone: LoadingLine['tone']) => {
  switch (tone) {
    case 'primary':
      return 'text-crimson-bright'
    case 'code':
      return 'text-rose-300'
    case 'alert':
      return 'text-red-400'
    default:
      return 'text-gray-400'
  }
}

const protocolHeaders = [
  'LASER.TYPE.PROTOCOL',
  'QUANTUM.SYNC.PROTOCOL',
  'NEURAL.LINK.PROTOCOL',
  'DATA.STREAM.PROTOCOL',
  'SECURE.RELAY.PROTOCOL',
  'CIPHER.HANDSHAKE.PROTOCOL',
  'VOID.TRANSFER.PROTOCOL',
  'PLASMA.ROUTE.PROTOCOL',
  'SYNTH.BRIDGE.PROTOCOL',
  'HYPER.NODE.PROTOCOL'
]

const getRandomProtocol = (): string => {
  return protocolHeaders[Math.floor(Math.random() * protocolHeaders.length)]
}

export default function PageTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [visibleLines, setVisibleLines] = useState<LoadingLine[]>([])
  const [variant, setVariant] = useState<TransitionVariant>('bootSequence')
  const [protocol, setProtocol] = useState<string>('LASER.TYPE.PROTOCOL')
  const isContact = pathname === '/contact'
  const revealDelay = 500

  useLayoutEffect(() => {
    // Set random transition variant and protocol header
    setVariant(getRandomVariant())
    setProtocol(getRandomProtocol())

    const config = pageConfigs[pathname] || pageConfigs['/']
    const allLines = buildLines(config)

    setIsLoading(true)
    setVisibleLines([])
    document.body.classList.add('page-transitioning')

    let index = 0
    const lineInterval = setInterval(() => {
      index += 1
      setVisibleLines(allLines.slice(0, index))
      if (index >= allLines.length) {
        clearInterval(lineInterval)
      }
    }, 70)

    // Contact page: 3 second tunnel animation (independent of content load)
    const totalDuration = isContact ? 3000 : (900 + allLines.length * 70)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, totalDuration)
    const revealTimer = setTimeout(() => {
      document.body.classList.remove('page-transitioning')
    }, totalDuration + revealDelay)

    return () => {
      clearInterval(lineInterval)
      clearTimeout(timer)
      clearTimeout(revealTimer)
      document.body.classList.remove('page-transitioning')
    }
  }, [pathname, isContact])

  const laserOffset = visibleLines.length * 22

  const renderTransition = () => {
    if (isContact) {
      // Special tunnel effect for contact page - 3 second animation
      return (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.2, opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-[#07090c]"
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute inset-0"
              initial={{ scale: 0.2 + i * 0.1, opacity: 0 }}
              animate={{ scale: 1.5 + i * 0.3, opacity: [0, 0.6, 0] }}
              transition={{ duration: 3, delay: i * 0.15, ease: 'easeOut' }}
              style={{
                backgroundImage: `radial-gradient(circle at center, transparent ${40 + i * 5}%, rgba(196, 30, 58, ${0.8 - i * 0.1}) ${42 + i * 5}%, transparent ${44 + i * 5}%)`
              }}
            />
          ))}
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            style={{ backgroundImage: 'radial-gradient(circle at center, rgba(196, 30, 58, 0.3) 0%, transparent 70%)' }}
          />
        </motion.div>
      )
    }

    switch (variant) {
      case 'bootSequence':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Animated grid background */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: 'linear-gradient(rgba(196, 30, 58, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(196, 30, 58, 0.1) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            {/* Scanning line */}
            <motion.div
              className="absolute inset-x-0 h-px bg-crimson-bright shadow-[0_0_20px_rgba(196,30,58,0.8)]"
              animate={{ y: ['0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        )

      case 'connection':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Ripple circles from center */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute inset-0"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 2, 4], opacity: [0.6, 0.3, 0] }}
                transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  backgroundImage: 'radial-gradient(circle at center, transparent 48%, rgba(6, 167, 125, 0.6) 50%, transparent 52%)'
                }}
              />
            ))}
          </div>
        )

      case 'dataTransfer':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Horizontal data streams */}
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-crimson to-transparent"
                style={{ top: `${10 + i * 12}%` }}
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 2, delay: i * 0.2, repeat: Infinity, ease: 'linear' }}
              />
            ))}
          </div>
        )

      case 'networkScan':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Hexagon grid pulse */}
            <motion.div
              className="absolute inset-0"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='rgba(6,167,125,0.3)' stroke-width='1'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 52px'
              }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
        )

      case 'securityCheck':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Lock/shield pattern */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 border border-yellow-500/40"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </div>
        )

      case 'compileBuild':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Binary rain effect */}
            {[...Array(26)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 text-blue-400/40 text-[10px] md:text-xs font-mono tracking-[0.2em]"
                style={{ left: `${(i / 26) * 100}%` }}
                animate={{ y: ['-10%', '110%'], opacity: [0.2, 0.6, 0.2] }}
                transition={{
                  duration: 6 + (i % 6),
                  delay: i * 0.12,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              >
                {Array.from({ length: 28 }, () => Math.random() > 0.5 ? '1' : '0').join('')}
              </motion.div>
            ))}
          </div>
        )

      case 'encryptionKey':
        return (
          <div className="absolute inset-0 bg-[#07090c]">
            {/* Matrix-style particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-green-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3,
                  delay: Math.random() * 3,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            ))}
          </div>
        )

    }
  }

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] pointer-events-none cursor-overlay"
        >
          {renderTransition()}

          {/* Terminal display - common for all pages */}
          <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
            <div className="w-full max-w-3xl">
              <div className="text-xs md:text-sm code-font text-gray-500 tracking-wider mb-3">
                {protocol}
              </div>

              <div className="relative border border-crimson/30 bg-[#0b0f14] p-5 md:p-6">
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(transparent_0px,rgba(255,255,255,0.02)_1px,transparent_2px)] bg-[length:100%_6px]" />

                <div className="relative space-y-1 text-xs md:text-sm code-font leading-5">
                  <AnimatePresence>
                    {visibleLines.map((line, index) => (
                      <motion.div
                        key={`${line.text}-${index}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={toneClass(line.tone)}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <motion.div
                  className="absolute left-4 right-4 h-px bg-gradient-to-r from-transparent via-crimson-bright to-transparent"
                  animate={{ y: laserOffset }}
                  transition={{ duration: 0.08, ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <style>{`
        body.page-transitioning {
          cursor: default !important;
        }
        body.page-transitioning * {
          cursor: default !important;
        }
      `}</style>
    </AnimatePresence>
  )
}
