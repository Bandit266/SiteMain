'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Draw circuit pattern on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      drawCircuits()
    }

    const drawCircuits = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const gridSize = 80
      const lineWidth = 1

      // Draw complex circuit pattern
      ctx.strokeStyle = 'rgba(196, 30, 58, 0.15)'
      ctx.lineWidth = lineWidth

      // Vertical and horizontal lines
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Add circuit nodes at intersections
      ctx.fillStyle = 'rgba(196, 30, 58, 0.3)'
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          if (Math.random() > 0.7) {
            ctx.beginPath()
            ctx.arc(x, y, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      // Draw diagonal circuit traces
      ctx.strokeStyle = 'rgba(196, 30, 58, 0.08)'
      ctx.lineWidth = 2
      for (let i = 0; i < 20; i++) {
        const startX = Math.random() * canvas.width
        const startY = Math.random() * canvas.height
        const endX = startX + (Math.random() - 0.5) * 300
        const endY = startY + (Math.random() - 0.5) * 300

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.stroke()
      }

      // Draw microchip-like rectangles
      ctx.strokeStyle = 'rgba(196, 30, 58, 0.12)'
      ctx.lineWidth = 1
      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const w = 40 + Math.random() * 60
        const h = 20 + Math.random() * 40

        ctx.strokeRect(x, y, w, h)

        // Draw pins
        const pins = Math.floor(Math.random() * 6) + 4
        for (let j = 0; j < pins; j++) {
          ctx.strokeRect(x - 5, y + (h / pins) * j, 5, 2)
          ctx.strokeRect(x + w, y + (h / pins) * j, 5, 2)
        }
      }
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    return () => window.removeEventListener('resize', resizeCanvas)
  }, [])

  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Canvas circuit pattern */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-40"
      />

      {/* Pulsing circuit lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(196, 30, 58, 0)" />
            <stop offset="50%" stopColor="rgba(196, 30, 58, 0.8)" />
            <stop offset="100%" stopColor="rgba(196, 30, 58, 0)" />
          </linearGradient>
        </defs>

        {/* Horizontal pulsing lines */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`h-${i}`}
            x1="0"
            y1={`${20 * i + 10}%`}
            x2="100%"
            y2={`${20 * i + 10}%`}
            stroke="url(#pulseGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Vertical pulsing lines */}
        {[...Array(5)].map((_, i) => (
          <motion.line
            key={`v-${i}`}
            x1={`${20 * i + 10}%`}
            y1="0"
            x2={`${20 * i + 10}%`}
            y2="100%"
            stroke="url(#pulseGradient)"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: [0, 1, 0] }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "linear",
              delay: i * 0.3
            }}
          />
        ))}
      </svg>

      {/* Flowing gradient overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(196, 30, 58, 0.08), transparent 40%)`
        }}
      />

      {/* Lightening gradient on mouse hover */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'linear-gradient(0deg, rgba(196, 30, 58, 0.03), transparent 50%)',
            'linear-gradient(180deg, rgba(196, 30, 58, 0.03), transparent 50%)',
            'linear-gradient(0deg, rgba(196, 30, 58, 0.03), transparent 50%)'
          ]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear"
        }}
      />

      {/* Mouse hover reveal effect */}
      <motion.div
        className="absolute rounded-full pointer-events-none mix-blend-screen"
        style={{
          width: 300,
          height: 300,
          left: smoothX,
          top: smoothY,
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(26, 40, 50, 0.4), transparent 70%)',
          filter: 'blur(20px)'
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-dark-bg/50 to-dark-bg" />

      {/* Scanline effect */}
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(196, 30, 58, 0.1) 50%)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          y: [0, -4]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}
