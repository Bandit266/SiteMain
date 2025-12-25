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
const quickCommands = ['help', 'factions', 'overview', 'multiplayer']

const dirCommand = (): TerminalLine[] => [
  { type: 'system', content: 'ARCHIVE.ROOT/' },
  { type: 'output', content: '  factions/' },
  { type: 'output', content: '  world/' },
  { type: 'output', content: '  regions/' },
  { type: 'output', content: '  systems/' },
  { type: 'output', content: '  multiplayer/' },
  { type: 'output', content: '  inventory/' },
  { type: 'output', content: '  customisation/' },
  { type: 'output', content: '  wildlife/' },
  { type: 'output', content: '  ruins/' },
  { type: 'output', content: '  comms/' },
]

const lexiconCommand = (): TerminalLine[] => [
  { type: 'system', content: 'LEXICON.SEED.TRANSMIT' },
  { type: 'output', content: '' },
  ...buildLexiconLines(lexiconWords),
]

const commands: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: 'system', content: 'COMMAND.INDEX:' },
    { type: 'output', content: '' },
    { type: 'output', content: '  factions        - Major powers and classified intel' },
    { type: 'output', content: '  overview        - Hyperdrift truth & consequences' },
    { type: 'output', content: '  multiplayer     - Arena specifications' },
    { type: 'output', content: '  inventory       - Modular storage systems' },
    { type: 'output', content: '  customisation   - Character mutation protocols' },
    { type: 'output', content: '  world           - World state and overview' },
    { type: 'output', content: '  regions         - Known districts and zones' },
    { type: 'output', content: '  systems         - Simulation stack' },
    { type: 'output', content: '  dir             - List archive nodes' },
    { type: 'output', content: '  clear           - Clear terminal' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Start typing to discover additional commands...' },
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
    { type: 'system', content: '>>>_FACTION.REGISTRY_[CLASSIFIED]' },
    { type: 'output', content: '' },
    { type: 'system', content: 'CLASSIFIED (FACTION):' },
    { type: 'output', content: 'Descended from the buried foundries of the old world, neighboring the' },
    { type: 'output', content: 'outskirts of the city, through tense exchange, this generation forged' },
    { type: 'output', content: 'for war and chains offer peace for city scraps. They reject the idea of' },
    { type: 'output', content: 'invasive AI technologies and choose stride as a walking fortress, armor' },
    { type: 'output', content: 'hammered straight into their flesh—They trust rivets and recoil where' },
    { type: 'output', content: 'others cling to fragile electronics.' },
    { type: 'output', content: '' },
    { type: 'system', content: 'CLASSIFIED (FACTION):' },
    { type: 'output', content: 'Masters of sanctioned science and invention, they believe survival is an' },
    { type: 'output', content: 'engineering problem, not a crusade—refined lightweight frames, synthetic' },
    { type: 'output', content: 'organs and seamless artificial skin, defining the widely envied agile' },
    { type: 'output', content: 'chassis made of composites and titanium. While silently bankrolling "The' },
    { type: 'output', content: 'Organization" and the expansion of the Hyper-Drift networks, they see' },
    { type: 'output', content: 'themselves as the last sane humans in a world of zealots and brutes even' },
    { type: 'output', content: 'as every year a little more of them becomes polymer, chrome and code.' },
    { type: 'output', content: '' },
    { type: 'system', content: 'CLASSIFIED (FACTION):' },
    { type: 'output', content: 'Once driven into exile from the cities they powered, this faith-forged' },
    { type: 'output', content: 'cult broke free of sanctioned science and the old divide between organic' },
    { type: 'output', content: 'and inorganic, chasing advancements in biometal at any cost—Their' },
    { type: 'output', content: 'inhuman experiments birthed the first living alloy. With it threaded' },
    { type: 'output', content: 'through their veins, numbing nerves into a perfect mind–machine symphony' },
    { type: 'output', content: 'that needs no code or upkeep;—now they walk the planet in black living' },
    { type: 'output', content: 'exoshells, human only in the consciousness and their rotting body buried' },
    { type: 'output', content: 'inside.' },
    { type: 'output', content: '' },
    { type: 'system', content: 'The Corporation (FACTION):' },
    { type: 'output', content: 'The black market and fixers for your hyperdrift. The debt collectors who' },
    { type: 'output', content: 'hunt and strip you to bare bones, literally. The true rulers of city and' },
    { type: 'output', content: 'slums without a face.' },
  ],
  overview: () => [
    { type: 'system', content: '>>>_HYPERDRIFT.TRUTH_[DECLASSIFIED]' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Everyone in the Slums carries a price tag, and sooner or later someone' },
    { type: 'output', content: 'comes to collect. What would you trade for an hour where your hands don\'t' },
    { type: 'output', content: 'shake, your shots don\'t miss, and the world finally obeys you? Your cash?' },
    { type: 'output', content: 'Your gear? Your blood? You tell yourself you\'d stop before you gave more.' },
    { type: 'output', content: 'Would you? In the Slums, promises are cheap and ledgers are not. The dens' },
    { type: 'output', content: 'ask again, softly at first: one pint, one tooth, one small cut from who' },
    { type: 'output', content: 'you are. You say no. Withdrawal answers for you.' },
    { type: 'output', content: '' },
    { type: 'output', content: 'They call the escape Hyperdrift—some spit "the Simulation," some brag' },
    { type: 'output', content: '"the Upload"—but everyone means the same bright place: open sky over' },
    { type: 'output', content: 'ruined highways, towers stuffed with loot, extraction points that bloom' },
    { type: 'output', content: 'like beacons and then turn into killing grounds. You ask if it\'s safer' },
    { type: 'output', content: 'than the streets. It isn\'t. You ask if it feels better. It does. That\'s' },
    { type: 'output', content: 'the problem. Inside Hyperdrift your body is amplified, your reflexes' },
    { type: 'output', content: 'clean, your will feels like law. You swear you\'ll cash out after one more' },
    { type: 'output', content: 'run. The craving laughs.' },
    { type: 'output', content: '' },
    { type: 'output', content: 'What happens when you fail? The price steps forward. First you lose what' },
    { type: 'output', content: 'you carried. Then the dens raise their fee. Can\'t pay? They write a' },
    { type: 'output', content: 'contract you never signed. Debt missions through gang turf. Forced' },
    { type: 'output', content: 'collections you\'ll hate yourself for. You ask how far it goes. Farther' },
    { type: 'output', content: 'than you think. Limbs for access. Organs for time. Cheap prosthetics' },
    { type: 'output', content: 'stitched on that jitter when it rains, reload before you tell them to.' },
    { type: 'output', content: 'You insist you\'re still human. Your crew looks at the metal in your' },
    { type: 'output', content: 'wrists and tries to believe you.' },
    { type: 'output', content: '' },
    { type: 'output', content: 'How long before the machine answers first? Crosshairs ghost across real' },
    { type: 'output', content: 'walls. HUD flashes where there should be paint. Your leg takes a step you' },
    { type: 'output', content: 'didn\'t choose because Hyperdrift taught it to. You ask if it\'s in your' },
    { type: 'output', content: 'head. It is. And your head is in the machine. The dens replay your best' },
    { type: 'output', content: 'moments at the door, slow-motion proof of who you could be if you just' },
    { type: 'output', content: 'went back inside. You promise yourself you\'ll quit after you square the' },
    { type: 'output', content: 'ledger. The ledger adds interest.' },
    { type: 'output', content: '' },
    { type: 'output', content: 'What about the ones who can\'t stop? They proxy in disposable bodies, weak' },
    { type: 'output', content: 'shells that still deliver a hit. They borrow flesh on timers and pray the' },
    { type: 'output', content: 'repo crews don\'t come early. They sell fragments of the life they had—' },
    { type: 'output', content: 'names fade, nights blur—and call it discipline. You ask if anyone gets' },
    { type: 'output', content: 'clean. Some do, by running until there\'s nothing left to take. Some' },
    { type: 'output', content: 'don\'t, by the same method.' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Every run is contested. Friends until the loot drops. Allies until the' },
    { type: 'output', content: 'exit lights. You ask why people keep trusting anyone at all. Because' },
    { type: 'output', content: 'survival in the Slums is a team sport and betrayal is a solo win, and' },
    { type: 'output', content: 'both are true until the moment one of them isn\'t. You bring home meds and' },
    { type: 'output', content: 'mods and think you\'ve beaten the world. Then the shaking starts again.' },
    { type: 'output', content: '' },
    { type: 'system', content: 'FACT:' },
    { type: 'output', content: 'Hyperdrift is the city\'s bright trap—an outlaw, high-risk arena whose' },
    { type: 'output', content: 'rewards follow you home, whose injuries do too, and whose entry fee' },
    { type: 'output', content: 'escalates into debt until the only thing left to pay is you.' },
  ],
  multiplayer: () => [
    { type: 'system', content: '>>>_MULTIPLAYER.ARENA_[SPECIFICATIONS]' },
    { type: 'output', content: '' },
    { type: 'system', content: 'CAPACITY:' },
    { type: 'output', content: 'Up to 100 players per instance' },
    { type: 'output', content: '' },
    { type: 'system', content: 'ENVIRONMENTS:' },
    { type: 'output', content: '• Open-world dystopian city - vertical arcologies, corporate districts' },
    { type: 'output', content: '• The Slums - black clinics, salvage yards, flooded metro systems' },
    { type: 'output', content: '• Desolate Wastelands - cracked highways, abandoned labs, storm fronts' },
    { type: 'output', content: '• Underground Networks - tunnel systems, hidden bunkers, faction bases' },
    { type: 'output', content: '• Contested Zones - extraction points, supply drops, mobile objectives' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Persistent world state. Dynamic threat density. Real consequences.' },
  ],
  inventory: () => [
    { type: 'system', content: '>>>_INVENTORY.SYSTEM_[SPATIAL.PROTOCOL]' },
    { type: 'output', content: '' },
    { type: 'system', content: 'MODULAR CLUSTER CONTAINER:' },
    { type: 'output', content: 'Grid-based spatial inventory with dynamic organization protocols' },
    { type: 'output', content: '' },
    { type: 'output', content: '• Items occupy physical grid space based on real dimensions' },
    { type: 'output', content: '• Stackable resources compress into optimized clusters' },
    { type: 'output', content: '• Modular containers expand capacity through found/crafted modules' },
    { type: 'output', content: '• Weight affects movement speed and stamina drain' },
    { type: 'output', content: '• Secure containers persist through death—limited slots' },
    { type: 'output', content: '• Rig customization for tactical loadouts and quick access' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Every slot matters. Every choice has weight. Literal weight.' },
  ],
  customisation: () => [
    { type: 'system', content: '>>>_CHARACTER.MUTATION_[PROTOCOL.MUTABLE]' },
    { type: 'output', content: '' },
    { type: 'system', content: 'BASELINE:' },
    { type: 'output', content: 'Everyone begins human.' },
    { type: 'output', content: '' },
    { type: 'system', content: 'CUSTOMISATION UNPRECEDENTED:' },
    { type: 'output', content: 'Leveraging mutable graph systems to create entirely modular characters' },
    { type: 'output', content: '' },
    { type: 'output', content: '• Organic augmentation - synthetic organs, enhanced musculature' },
    { type: 'output', content: '• Cybernetic integration - neural implants, prosthetic limbs' },
    { type: 'output', content: '• Biometal threading - living alloy fused with nervous system' },
    { type: 'output', content: '• Exoskeletal frameworks - external armor bonded to skeleton' },
    { type: 'output', content: '• Genetic modification - CRISPR protocols, DNA resequencing' },
    { type: 'output', content: '' },
    { type: 'output', content: 'Trade humanity for performance. Trade flesh for function.' },
    { type: 'output', content: 'The question isn\'t what you become—it\'s what you were willing to lose.' },
  ],
  signals: () => [
    { type: 'system', content: 'AI.RELAY.STATUS' },
    { type: 'output', content: 'AI_BOT: Online. Awaiting query tokens.' },
    { type: 'output', content: 'AI_BOT: Route requests through /comms and /regions.' },
    { type: 'output', content: 'AI_BOT: Use "lexicon" for current terminology keys.' },
  ],
  dev: () => [
    { type: 'system', content: '>>>_DEV.QUERY_[ACCESS.DENIED]' },
    { type: 'output', content: '' },
    { type: 'output', content: 'HA!... yeh wouldnt you like to know!' },
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
              <div className="text-gray-400">/factions</div>
              <div className="text-gray-400">/world</div>
              <div className="text-gray-400">/regions</div>
              <div className="text-gray-400">/systems</div>
              <div className="text-gray-400">/multiplayer</div>
              <div className="text-gray-400">/inventory</div>
              <div className="text-gray-400">/comms</div>
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
              className={`p-5 ${heightClass ?? 'h-[520px] md:h-[680px]'} overflow-y-auto font-mono text-xs bg-[#090c11] custom-scrollbar`}
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
                  placeholder='Type "help" to see commands... or start typing to discover.'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-gray-300 caret-crimson-bright placeholder:text-gray-200/40"
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
