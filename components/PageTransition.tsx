'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

type LoadingLine = {
  text: string
  tone: 'primary' | 'muted' | 'code' | 'alert'
}

type TransitionVariant = 'bootSequence' | 'dataTransfer' | 'networkScan' | 'securityCheck' | 'compileBuild' | 'encryptionKey'
type CenterVariant = 'stackedModules' | 'minimalLoad' | 'rightRailCode' | 'signalMatrix'

const getRandomVariant = (): TransitionVariant => {
  const variants: TransitionVariant[] = ['bootSequence', 'dataTransfer', 'networkScan', 'securityCheck', 'compileBuild', 'encryptionKey']
  return variants[Math.floor(Math.random() * variants.length)]
}

const getRandomCenterVariant = (): CenterVariant => {
  const variants: CenterVariant[] = ['stackedModules', 'minimalLoad', 'rightRailCode', 'signalMatrix']
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
  const [allLines, setAllLines] = useState<LoadingLine[]>([])
  const [visibleLines, setVisibleLines] = useState<LoadingLine[]>([])
  const [variant, setVariant] = useState<TransitionVariant>('bootSequence')
  const [centerVariant, setCenterVariant] = useState<CenterVariant>('stackedModules')
  const [protocol, setProtocol] = useState<string>('LASER.TYPE.PROTOCOL')
  const isContact = pathname === '/contact'
  const revealDelay = 500

  useLayoutEffect(() => {
    // Set random transition variant and protocol header
    setVariant(getRandomVariant())
    setCenterVariant(getRandomCenterVariant())
    setProtocol(getRandomProtocol())

    const config = pageConfigs[pathname] || pageConfigs['/']
    const builtLines = buildLines(config)
    setAllLines(builtLines)

    setIsLoading(true)
    setVisibleLines([])
    document.body.classList.add('page-transitioning')

    let index = 0
    const lineInterval = setInterval(() => {
      index += 1
      setVisibleLines(builtLines.slice(0, index))
      if (index >= builtLines.length) {
        clearInterval(lineInterval)
      }
    }, 70)

    // Contact page: 3 second tunnel animation (independent of content load)
    const totalDuration = isContact ? 3000 : (900 + builtLines.length * 70)
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

  const renderCenter = () => {
    const fallbackLines: LoadingLine[] = [
      { text: '>>>SYNC.CORE', tone: 'primary' },
      { text: 'Calibrating channels...', tone: 'muted' },
      { text: 'int linkNode(uint8_t id);', tone: 'code' },
      { text: '[WARN] Latency spike detected', tone: 'alert' },
      { text: 'Stabilizing mesh routing...', tone: 'muted' },
    ]
    const displayLines = allLines.length > 0 ? allLines : fallbackLines
    const activeLines = visibleLines.length > 0 ? visibleLines : displayLines
    const primaryLine = displayLines[0]?.text ?? '>>>INITIALIZING'
    const secondaryLine = displayLines[1]?.text ?? 'Aligning systems...'

    switch (centerVariant) {
      case 'stackedModules': {
        const moduleLayouts = [
          { id: 'core', label: 'MODULE.CORE', lines: displayLines.slice(0, 3), left: '42%', top: '34%' },
          { id: 'sync', label: 'MODULE.SYNC', lines: displayLines.slice(1, 4), left: '56%', top: '48%' },
          { id: 'io', label: 'MODULE.IO', lines: displayLines.slice(2, 5), left: '48%', top: '62%' },
        ]

        return (
          <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
            <div className="relative w-full max-w-4xl h-72">
              <div className="absolute left-0 right-0 -top-6 text-[10px] md:text-xs code-font text-gray-500 tracking-[0.35em] text-center">
                {protocol}
              </div>
              {moduleLayouts.map((module, index) => (
                <motion.div
                  key={module.id}
                  className="absolute w-64 md:w-72 border border-crimson/30 bg-[#0b0f14]/85 p-4"
                  style={{ left: module.left, top: module.top }}
                  animate={{
                    opacity: [0, 1, 1, 0],
                    y: [12, 0, 0, -10],
                    scale: [0.96, 1, 1.02, 1.02],
                  }}
                  transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.35 }}
                >
                  <div className="text-[10px] text-gray-500 tracking-[0.3em] mb-2">
                    {module.label}
                  </div>
                  <div className="space-y-1 text-[11px] code-font leading-4">
                    {module.lines.map((line, lineIndex) => (
                      <div key={`${module.id}-${lineIndex}`} className={toneClass(line.tone)}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )
      }

      case 'minimalLoad':
        return (
          <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
            <div className="w-full max-w-md border border-crimson/30 bg-[#0b0f14]/80 p-6">
              <div className="text-[10px] text-gray-500 tracking-[0.4em] mb-4">
                SYSTEM.LOAD.SEQUENCE
              </div>
              <div className="flex items-center gap-4">
                <motion.div
                  className="w-12 h-12 rounded-full border border-crimson/40 border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
                />
                <div className="flex-1">
                  <div className="text-xs code-font text-crimson-bright">{primaryLine}</div>
                  <div className="mt-2 h-1 bg-crimson/20 overflow-hidden">
                    <motion.div
                      className="h-full bg-crimson-bright"
                      animate={{ width: ['10%', '85%', '35%'] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </div>
                  <div className="mt-2 text-[10px] text-gray-500">{secondaryLine}</div>
                </div>
              </div>
            </div>
          </div>
        )

      case 'rightRailCode':
        return (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2">
              <div className="text-[10px] text-gray-500 tracking-[0.35em] mb-2 text-right">
                {protocol}
              </div>
              <div className="w-72 md:w-80 border border-crimson/30 bg-[#0b0f14]/85 p-3">
                <div className="relative">
                  <div className="space-y-1 text-[11px] md:text-xs code-font leading-4 text-left">
                    {activeLines.map((line, index) => (
                      <motion.div
                        key={`${line.text}-${index}`}
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className={toneClass(line.tone)}
                      >
                        {line.text}
                      </motion.div>
                    ))}
                  </div>
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-crimson-bright to-transparent"
                    animate={{ y: laserOffset }}
                    transition={{ duration: 0.08, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
            <div className="relative w-full max-w-4xl">
              <div className="absolute left-1/2 top-1/2 w-36 h-36 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute inset-0 rounded-full border border-crimson/30" />
                <motion.div
                  className="absolute inset-3 rounded-full border border-crimson/40"
                  animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute left-1/2 top-0 h-full w-px bg-crimson/30" />
                <div className="absolute top-1/2 left-0 h-px w-full bg-crimson/30" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-crimson/30 bg-[#0b0f14]/85 p-4">
                  <div className="text-[10px] text-gray-500 tracking-[0.35em] mb-2">
                    {protocol}
                  </div>
                  <div className="space-y-1 text-[11px] md:text-xs code-font leading-4">
                    {displayLines.slice(0, 3).map((line, index) => (
                      <div key={`matrix-left-${index}`} className={toneClass(line.tone)}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border border-crimson/20 bg-[#0b0f14]/75 p-4">
                  <div className="text-[10px] text-gray-500 tracking-[0.35em] mb-2">
                    SIGNAL.MATRIX
                  </div>
                  <div className="space-y-1 text-[11px] md:text-xs code-font leading-4 text-gray-400">
                    {displayLines.slice(3, 6).map((line, index) => (
                      <div key={`matrix-right-${index}`} className={toneClass(line.tone)}>
                        {line.text}
                      </div>
                    ))}
                  </div>
                  <motion.div
                    className="mt-4 h-px bg-gradient-to-r from-transparent via-crimson-bright to-transparent"
                    animate={{ x: ['-40%', '140%'] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </div>
            </div>
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
          {renderCenter()}
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
