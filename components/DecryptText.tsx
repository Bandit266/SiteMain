'use client'

import { useState, useEffect } from 'react'

interface DecryptTextProps {
  text: string
  className?: string
  speed?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
}

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`'

export default function DecryptText({
  text,
  className = '',
  speed = 50,
  as: Component = 'span'
}: DecryptTextProps) {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    if (!isHovering) {
      setDisplayText(text)
      return
    }

    let iteration = 0
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ' || char === '_' || char === '.' || char === '-') {
              return char
            }

            if (index < iteration) {
              return text[index]
            }

            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, speed)

    return () => clearInterval(interval)
  }, [isHovering, text, speed])

  return (
    <Component
      className={className}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {displayText}
    </Component>
  )
}
