'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalLine {
  type: 'command' | 'output' | 'error' | 'system'
  content: string
  timestamp?: string
}

const lexiconWords = [
  'ASHFALL', 'BLACKOUT', 'CHOKEPATH', 'DUSTLINE', 'ECHOFIELD', 'GUTTERGRID',
  'NEONFALL', 'NIGHTMARKET', 'SHADOWPORT', 'SCRAPWIND', 'GLASSHARBOR', 'RUSTTIDE',
  'VOIDLANE', 'CIRCUITDAWN', 'GHOSTSTACK', 'FRACTUREGATE', 'STATICBLOOM', 'CINDERZONE',
  'DRIFTFUEL', 'SALVAGERUN', 'NOMADLINE', 'QUARANTINE', 'HELIXFARM', 'SILTDOCK',
  'OVERFLOW', 'RAILHOLLOW', 'VOLTLOCK', 'HARDLIGHT', 'COLDPATCH', 'THREADCACHE',
  'SKYVAULT', 'DEADCITY', 'STORMCUT', 'GLITCHWELL', 'BLACKICE', 'RIPCORD',
  'COALTRAIL', 'HOLLOWSTACK', 'RADIRIDGE', 'IRONVEIL', 'DATARUIN', 'ASHENWAY',
  'FARLIGHT', 'WRAITHNET', 'GLASSWALK', 'SALTCRACK', 'EMBERZONE', 'BLOODNODE'
]

const chunkWords = (words: string[], size: number) => {
  const chunks: string[][] = []
  for (let i = 0; i < words.length; i += size) {
    chunks.push(words.slice(i, i + size))
  }
  return chunks
}

const buildLexiconLines = (words: string[]) =>
  chunkWords(words, 4).map((group) => ({
    type: 'output' as const,
    content: `LEXICON> ${group.join('  ')}`
  }))

const initialLexiconWords = lexiconWords.slice(0, 16)
const quickCommands = ['help', 'dir', 'world', 'signals']

const dirCommand = (): TerminalLine[] => [
  { type: 'system', content: 'ARCHIVE.ROOT/' },
  { type: 'output', content: '  world/' },
  { type: 'output', content: '  regions/' },
  { type: 'output', content: '  survival/' },
  { type: 'output', content: '  systems/' },
  { type: 'output', content: '  factions/' },
  { type: 'output', content: '  wildlife/' },
  { type: 'output', content: '  ruins/' },
  { type: 'output', content: '  comms/' },
  { type: 'output', content: '  lexicon.txt' },
]

const lexiconCommand = (): TerminalLine[] => [
  { type: 'system', content: 'LEXICON.SEED.TRANSMIT' },
  { type: 'output', content: '' },
  ...buildLexiconLines(lexiconWords),
]

const commands: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: 'system', content: 'COMMAND.INDEX:' },
    { type: 'output', content: '  dir          - List archive nodes' },
    { type: 'output', content: '  lexicon      - Transmit world lexicon' },
    { type: 'output', content: '  world        - Open world overview' },
    { type: 'output', content: '  regions      - Known districts and zones' },
    { type: 'output', content: '  survival     - Core survival loop' },
    { type: 'output', content: '  systems      - Simulation stack' },
    { type: 'output', content: '  factions     - Major powers' },
    { type: 'output', content: '  signals      - AI relay status' },
    { type: 'output', content: '  clear        - Clear terminal' },
  ],
  dir: dirCommand,
  ls: dirCommand,
  lexicon: lexiconCommand,
  world: () => [
    { type: 'system', content: 'WORLD.OVERVIEW' },
    { type: 'output', content: 'Open-world survival across a collapsed megacity and its dead zones.' },
    { type: 'output', content: 'Day-night cycles shift threat density, power access, and faction patrols.' },
    { type: 'output', content: 'Urban towers, subsurface tunnels, and wasteland outskirts are fully explorable.' },
    { type: 'output', content: 'Player choices reshape district control, trade routes, and safehouse grids.' },
  ],
  regions: () => [
    { type: 'system', content: 'REGION.MAP' },
    { type: 'output', content: 'NEON CORE - corporate arcologies, vertical markets, drone lanes' },
    { type: 'output', content: 'LOWLINE - slums, salvage yards, black clinics, flooded subways' },
    { type: 'output', content: 'WASTEFIELDS - cracked solar farms, sand storms, hidden bunkers' },
    { type: 'output', content: 'SKYRAIL - suspended transit spines, raider nests, wind hazards' },
    { type: 'output', content: 'OUTLANDS - abandoned labs, biotech ruins, feral zones' },
  ],
  survival: () => [
    { type: 'system', content: 'SURVIVAL.LOOP' },
    { type: 'output', content: 'Hydration, heat, and radiation force constant route planning.' },
    { type: 'output', content: 'Scavenge components to craft gear, shelters, and signal beacons.' },
    { type: 'output', content: 'Hunt, trade, or raid to keep food and fuel stable.' },
    { type: 'output', content: 'Safehouses act as respawn nodes and dynamic storage caches.' },
  ],
  systems: () => [
    { type: 'system', content: 'SIMULATION.STACK' },
    { type: 'output', content: 'Dynamic weather fronts, electrical storms, and blackout events.' },
    { type: 'output', content: 'Faction reputation unlocks traversal perks and underground markets.' },
    { type: 'output', content: 'Stealth, hacking, and traversal upgrades shape build identity.' },
    { type: 'output', content: 'Mission generator pulls from district states and active threats.' },
  ],
  factions: () => [
    { type: 'system', content: 'FACTION.REGISTRY' },
    { type: 'output', content: 'THE CROWNS - corporate enforcers guarding power nodes.' },
    { type: 'output', content: 'DUST_RUNNERS - nomads controlling salvage routes and caravans.' },
    { type: 'output', content: 'VOLT_CULT - tech zealots weaponizing relic systems.' },
    { type: 'output', content: 'HOLLOW_GUILD - smugglers trading data, implants, and illicit maps.' },
  ],
  signals: () => [
    { type: 'system', content: 'AI.RELAY.STATUS' },
    { type: 'output', content: 'AI_BOT: Online. Awaiting query tokens.' },
    { type: 'output', content: 'AI_BOT: Route requests through /comms and /regions.' },
    { type: 'output', content: 'AI_BOT: Use "lexicon" for current terminology keys.' },
  ],
}

interface TerminalProps {
  heightClass?: string
}

export default function Terminal({ heightClass }: TerminalProps) {
  const bootLines: TerminalLine[] = [
    { type: 'system', content: '>>>TERMINAL.EXE v3.9.1' },
    { type: 'system', content: 'AI.RELAY: ACTIVE | NODE: D-77' },
    { type: 'output', content: '' },
    { type: 'system', content: 'INITIALIZING: SYNTHETIX.RELAY' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Type "help" or tap a quick command to begin' },
  ]
  const [lines, setLines] = useState<TerminalLine[]>([])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    let index = 0
    const timer = setInterval(() => {
      setLines((prev) => {
        if (index >= bootLines.length) {
          return prev
        }
        return [...prev, bootLines[index]]
      })
      index += 1
      if (index >= bootLines.length) {
        clearInterval(timer)
      }
    }, 90)

    return () => clearInterval(timer)
  }, [])

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()

    setHistory(prev => [...prev, cmd])
    setHistoryIndex(-1)

    const newLines: TerminalLine[] = [
      ...lines,
      { type: 'command', content: `$ ${cmd}`, timestamp: new Date().toLocaleTimeString() }
    ]

    if (trimmedCmd === 'clear') {
      setLines([])
      return
    }

    if (trimmedCmd === '') {
      setLines([...newLines, { type: 'output', content: '' }])
      return
    }

    const commandFn = commands[trimmedCmd]
    if (commandFn) {
      setLines([...newLines, ...commandFn(), { type: 'output', content: '' }])
    } else {
      setLines([
        ...newLines,
        { type: 'error', content: `Command not found: ${cmd}` },
        { type: 'output', content: 'Type "help" for command index' },
        { type: 'output', content: '' }
      ])
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      handleCommand(input)
      setInput('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1)
        setHistoryIndex(newIndex)
        setInput(newIndex === history.length - 1 ? '' : history[newIndex])
      }
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="bg-[#07090c] border border-crimson/40 shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0e14] border-b border-crimson/20">
          <span className="text-xs code-font text-gray-500">TERMINAL.exe / NODE.D-77</span>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-crimson-bright rounded-full animate-pulse" />
            <span className="text-xs code-font text-crimson-bright">ONLINE</span>
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex">
          <aside className="hidden lg:flex w-56 flex-col gap-4 border-r border-crimson/10 bg-[#0b0f14] p-4 text-xs code-font">
            <div>
              <div className="text-gray-500 mb-2">NODE.MAP</div>
              <div className="text-gray-400">/world</div>
              <div className="text-gray-400">/regions</div>
              <div className="text-gray-400">/survival</div>
              <div className="text-gray-400">/systems</div>
              <div className="text-gray-400">/factions</div>
              <div className="text-gray-400">/comms</div>
              <div className="text-gray-400">/lexicon.txt</div>
            </div>
            <div>
              <div className="text-gray-500 mb-2">NODE.STATUS</div>
              <div className="text-gray-400">POWER: 98%</div>
              <div className="text-gray-400">UPLINK: STABLE</div>
              <div className="text-gray-400">SIGNAL: CLEAN</div>
              <div className="text-gray-400">THREAT: LOW</div>
            </div>
            <div>
              <div className="text-gray-500 mb-2">CACHE.LOAD</div>
              <div className="h-1 bg-[#0f1419] border border-crimson/20">
                <div className="h-full bg-crimson/60 w-[78%]" />
              </div>
              <div className="text-gray-500 mt-2">MEM: 78%</div>
            </div>
          </aside>

          <div className="flex-1">
            <div
              ref={terminalRef}
              className={`p-5 ${heightClass ?? 'h-[520px] md:h-[680px]'} overflow-y-auto font-mono text-sm bg-[#090c11] custom-scrollbar`}
            >
              <div className="flex flex-wrap items-center gap-2 mb-4 text-xs code-font">
                <span className="text-gray-500 tracking-widest">QUICK.CMDS</span>
                {quickCommands.map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => {
                      setInput(cmd)
                      inputRef.current?.focus()
                    }}
                    className="px-2 py-1 border border-crimson/30 text-gray-300 hover:text-crimson-bright hover:border-crimson/60 transition-colors bg-white/5"
                  >
                    {cmd}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="popLayout">
                {lines.filter(Boolean).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`mb-1 ${
                      line.type === 'command'
                        ? 'text-crimson-bright font-bold'
                        : line.type === 'error'
                        ? 'text-red-400'
                        : line.type === 'system'
                        ? 'text-rose-300'
                        : 'text-gray-300'
                    }`}
                  >
                    {line.type === 'command' && line.timestamp && (
                      <span className="text-gray-600 text-xs mr-2">[{line.timestamp}]</span>
                    )}
                    {line.content}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-3">
                <span className="text-crimson-bright">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder='Type "help" to see commands...'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-gray-300 caret-crimson-bright placeholder:text-gray-200/40"
                  autoFocus
                  spellCheck={false}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                  className="w-2 h-4 bg-crimson-bright"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="px-4 py-3 bg-[#0a0e14] border-t border-crimson/20 flex items-center justify-between text-xs code-font text-gray-600">
          <span>Press Up/Down for history</span>
          <span>Type "help" for command index</span>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(196, 30, 58, 0.08);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(196, 30, 58, 0.45);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(196, 30, 58, 0.7);
        }
      `}</style>
    </motion.div>
  )
}
