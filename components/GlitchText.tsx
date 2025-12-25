'use client'

import { useEffect, useState } from 'react'

interface GlitchTextProps {
  text: string
  className?: string
  interval?: number
  hold?: number
  intensity?: number
  glitchPool?: string[]
  mode?: 'random' | 'similar'
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div'
}

const GLITCH_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}<>?/\\|'
const SIMILAR_MAP: Record<string, string[]> = {
  A: ['A', '4', '@'],
  B: ['B', '8'],
  C: ['C', '(', '<'],
  D: ['D', '0'],
  E: ['E', '3'],
  F: ['F', '7'],
  G: ['G', '6'],
  H: ['H', '#'],
  I: ['I', '1', '|'],
  J: ['J', '7'],
  K: ['K', 'X'],
  L: ['L', '1', '|'],
  M: ['M', 'N', 'W'],
  N: ['N', 'M'],
  O: ['O', '0'],
  P: ['P', '9'],
  Q: ['Q', '0'],
  R: ['R', 'K'],
  S: ['S', '5', '$'],
  T: ['T', '7', '+'],
  U: ['U', 'V'],
  V: ['V', 'U'],
  W: ['W', 'M'],
  X: ['X', 'K'],
  Y: ['Y', 'V'],
  Z: ['Z', '2'],
  0: ['0', 'O'],
  1: ['1', 'I', '|'],
  2: ['2', 'Z'],
  3: ['3', 'E'],
  4: ['4', 'A'],
  5: ['5', 'S'],
  6: ['6', 'G'],
  7: ['7', 'T'],
  8: ['8', 'B'],
  9: ['9', 'P'],
}

const isLockedChar = (char: string) => (
  char === ' ' || char === '_' || char === '.' || char === '-' || char === '>' || char === '/' || char === ':'
)

const pickSimilarChar = (char: string) => {
  const upper = char.toUpperCase()
  const options = SIMILAR_MAP[upper]
  if (!options || options.length === 0) {
    return null
  }
  let next = options[Math.floor(Math.random() * options.length)]
  let attempts = 0
  while (next === upper && attempts < 5) {
    next = options[Math.floor(Math.random() * options.length)]
    attempts += 1
  }
  if (char === upper) {
    return next
  }
  const lower = next.toLowerCase()
  return /[a-z]/.test(lower) ? lower : next
}

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const getGlitchChar = (char: string, mode: 'random' | 'similar') => {
  if (mode === 'similar') {
    return pickSimilarChar(char)
  }
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
}

export default function GlitchText({
  text,
  className = '',
  interval = 3000,
  hold = 0,
  intensity = 0.16,
  glitchPool,
  mode = 'similar',
  as: Component = 'span',
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isGlitching, setIsGlitching] = useState(false)

  useEffect(() => {
    setDisplayText(text)
  }, [text])

  useEffect(() => {
    if (glitchPool && glitchPool.length > 0) {
      let timeoutId: NodeJS.Timeout | null = null
      let glitchTimeoutId: NodeJS.Timeout | null = null

      const trigger = () => {
        setIsGlitching(true)
        setDisplayText(glitchPool[Math.floor(Math.random() * glitchPool.length)])

        glitchTimeoutId = setTimeout(() => setIsGlitching(false), 120)

        if (hold > 0) {
          timeoutId = setTimeout(() => setDisplayText(text), hold)
        }
      }

      const intervalId = setInterval(trigger, interval)

      return () => {
        clearInterval(intervalId)
        if (timeoutId) {
          clearTimeout(timeoutId)
        }
        if (glitchTimeoutId) {
          clearTimeout(glitchTimeoutId)
        }
      }
    }

    const chars = text.split('')
    const mutableIndexes = chars
      .map((char, index) => (isLockedChar(char) ? -1 : index))
      .filter((index) => index !== -1)

    if (mutableIndexes.length === 0) {
      setDisplayText(text)
      setIsGlitching(false)
      return
    }

    const safeInterval = Math.max(480, interval)
    const minGap = safeInterval * 0.7
    const maxGap = safeInterval * 2.1
    const minDuration = Math.min(120, safeInterval * 0.28)
    const maxDuration = Math.min(180, safeInterval * 0.42)
    const maxActive = mode === 'similar'
      ? 1
      : Math.max(1, Math.min(2, Math.round(mutableIndexes.length * intensity * 0.12 + 0.5)))

    const nextAt = new Array(chars.length).fill(Number.POSITIVE_INFINITY)
    const until = new Array(chars.length).fill(0)
    const glitchChars = new Array(chars.length).fill('')
    const now = Date.now()

    mutableIndexes.forEach((index) => {
      nextAt[index] = now + randomBetween(minGap, maxGap)
    })

    const tick = () => {
      const current = Date.now()
      let activeCount = 0

      mutableIndexes.forEach((index) => {
        if (current < until[index]) {
          activeCount += 1
        }
      })

      mutableIndexes.forEach((index) => {
        if (current >= nextAt[index] && activeCount < maxActive) {
          const nextChar = getGlitchChar(chars[index], mode)
          if (nextChar && nextChar !== chars[index]) {
            glitchChars[index] = nextChar
            until[index] = current + randomBetween(minDuration, maxDuration)
            activeCount += 1
          }
          nextAt[index] = current + randomBetween(minGap, maxGap)
        }
      })

      const nextText = chars
        .map((char, index) => (current < until[index] && glitchChars[index] ? glitchChars[index] : char))
        .join('')

      setDisplayText((prev) => (prev === nextText ? prev : nextText))
      setIsGlitching(activeCount > 0)
    }

    tick()
    const intervalId = setInterval(tick, 80)

    return () => clearInterval(intervalId)
  }, [text, interval, hold, intensity, glitchPool, mode])

  return (
    <>
      <Component
        className={`${className} ${isGlitching ? 'glitch-active' : ''}`}
        data-text={displayText}
      >
        {displayText}
      </Component>

      <style jsx>{`
        @keyframes tv-glitch {
          0% {
            transform: scaleX(1) translateX(0);
            opacity: 1;
          }
          15% {
            transform: scaleX(1.01) translateX(-1px);
            opacity: 0.96;
          }
          30% {
            transform: scaleX(0.99) translateX(1px);
            opacity: 0.94;
          }
          45% {
            transform: scaleX(1.005) translateX(-0.5px);
            opacity: 0.95;
          }
          60% {
            transform: scaleX(0.995) translateX(0.8px);
            opacity: 0.93;
          }
          75% {
            transform: scaleX(1.004) translateX(-0.6px);
            opacity: 0.95;
          }
          100% {
            transform: scaleX(1) translateX(0);
            opacity: 1;
          }
        }

        @keyframes horizontal-scan {
          0%, 100% {
            clip-path: inset(0 0 100% 0);
          }
          25% {
            clip-path: inset(0 0 75% 0);
          }
          50% {
            clip-path: inset(0 0 50% 0);
          }
          75% {
            clip-path: inset(0 0 25% 0);
          }
        }

        :global(.glitch-active) {
          animation: tv-glitch 120ms ease-out;
          display: inline-block;
          position: relative;
        }

        :global(.glitch-active::before) {
          content: attr(data-text);
          position: absolute;
          left: -1px;
          text-shadow: 1px 0 #ff0000;
          top: 0;
          color: inherit;
          overflow: hidden;
          animation: horizontal-scan 120ms steps(4, end);
          opacity: 0.35;
          pointer-events: none;
        }

        :global(.glitch-active::after) {
          content: attr(data-text);
          position: absolute;
          left: 1px;
          text-shadow: -1px 0 #00ffff;
          top: 0;
          color: inherit;
          overflow: hidden;
          animation: horizontal-scan 120ms steps(4, end) reverse;
          opacity: 0.35;
          pointer-events: none;
        }
      `}</style>
    </>
  )
}
