'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useLayoutEffect, useState } from 'react'

type LoadingLine = {
  text: string
  tone: 'primary' | 'muted' | 'code' | 'alert'
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

const buildLines = (config: (typeof pageConfigs)[keyof typeof pageConfigs]): LoadingLine[] => [
  { text: `>>>${config.primary}`, tone: 'primary' },
  { text: config.secondary[0], tone: 'muted' },
  { text: config.cppFunctions[0], tone: 'code' },
  { text: config.errors[0], tone: 'alert' },
  { text: config.tertiary[0], tone: 'muted' },
  { text: config.secondary[1] || config.secondary[0], tone: 'muted' },
]

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

export default function PageTransition() {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [visibleLines, setVisibleLines] = useState<LoadingLine[]>([])
  const isContact = pathname === '/contact'
  const revealDelay = 500

  useLayoutEffect(() => {
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

    const totalDuration = 900 + allLines.length * 70
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
  }, [pathname])

  const laserOffset = visibleLines.length * 22

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="page-transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] pointer-events-none"
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.45, ease: 'easeInOut' }}
            className="absolute inset-0 bg-[#07090c] origin-top"
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#0b0f14] via-[#07090c] to-[#050608]" />
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"
              animate={{ y: ['-120%', '120%'] }}
              transition={{ duration: 1, ease: 'linear' }}
            />
            {isContact && (
              <motion.div
                className="absolute inset-0 opacity-70"
                animate={{ scale: [1, 1.15], opacity: [0.4, 0.8] }}
                transition={{ duration: 0.9, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  backgroundImage: 'radial-gradient(circle at center, transparent 30%, rgba(196, 30, 58, 0.45) 42%, transparent 55%)'
                }}
              />
            )}
            {isContact && (
              <motion.div
                className="absolute inset-0 opacity-50"
                animate={{ scale: [1.2, 1.6], opacity: [0.2, 0.6] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
                style={{
                  backgroundImage: 'radial-gradient(circle at center, transparent 35%, rgba(255, 255, 255, 0.12) 46%, transparent 60%)'
                }}
              />
            )}

            <div className="absolute inset-0 flex items-center justify-center px-4">
              <div className="w-full max-w-3xl">
                <div className="text-xs md:text-sm code-font text-gray-500 tracking-wider mb-3">
                  {isContact ? 'TUNNEL.HANDSHAKE.PROTOCOL' : 'LASER.TYPE.PROTOCOL'}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
