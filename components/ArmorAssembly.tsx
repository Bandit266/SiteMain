'use client'

import { useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import Image from 'next/image'

export default function ArmorAssembly() {
  const { scrollYProgress } = useScroll()
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  // Smooth mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 })
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 })

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      mouseX.set(x)
      mouseY.set(y)
      setMousePosition({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Image crossfade based on scroll
  const image1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.5, 0])
  const image2Opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0])

  // Parallax effect based on mouse position
  const parallaxX = useTransform(smoothMouseX, [-1, 1], [-20, 20])
  const parallaxY = useTransform(smoothMouseY, [-1, 1], [-20, 20])

  // Transform scroll progress to different layer opacities and positions
  const layer1Opacity = useTransform(scrollYProgress, [0, 0.15], [0, 1])
  const layer2Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1])
  const layer3Opacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1])
  const layer4Opacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1])

  // Positions for assembly effect
  const layer1Y = useTransform(scrollYProgress, [0, 0.15], [100, 0])
  const layer2Y = useTransform(scrollYProgress, [0.1, 0.25], [-100, 0])
  const layer3X = useTransform(scrollYProgress, [0.2, 0.35], [-100, 0])
  const layer4X = useTransform(scrollYProgress, [0.3, 0.45], [100, 0])

  const baseOpacity = useTransform(scrollYProgress, [0, 0.05], [0.3, 1])

  // Highlight layer opacity
  const highlightOpacity = useTransform(scrollYProgress, [0.4, 0.5], [0, 0.3])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 z-0">
      {/* Image 1 with Parallax and Crossfade */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: image1Opacity,
          x: parallaxX,
          y: parallaxY,
        }}
      >
        <Image
          src="/Assets/Sh1.jpg"
          alt="Hero Background 1"
          fill
          className="object-cover"
          priority
          quality={100}
        />
      </motion.div>

      {/* Image 2 Crossfades in as you scroll */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: image2Opacity,
          x: parallaxX,
          y: parallaxY,
        }}
      >
        <Image
          src="/Assets/Sh2.jpg"
          alt="Hero Background 2"
          fill
          className="object-cover"
          quality={100}
        />
      </motion.div>

      {/* Layer 1 - Core/Body (fades in from bottom) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: layer1Opacity,
          y: layer1Y
        }}
      >
        <Image
          src="/Assets/Sh1.jpg"
          alt="Armor Layer 1"
          fill
          className="object-cover"
          style={{
            clipPath: 'polygon(30% 20%, 70% 20%, 70% 80%, 30% 80%)',
            filter: 'brightness(1.1)'
          }}
          priority
          quality={100}
        />
      </motion.div>

      {/* Layer 2 - Head/Upper (fades in from top) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: layer2Opacity,
          y: layer2Y
        }}
      >
        <Image
          src="/Assets/Sh1.jpg"
          alt="Armor Layer 2"
          fill
          className="object-cover"
          style={{
            clipPath: 'polygon(25% 0%, 75% 0%, 75% 30%, 25% 30%)',
            filter: 'brightness(1.15) contrast(1.1)'
          }}
          quality={100}
        />
      </motion.div>

      {/* Layer 3 - Left Side (slides in from left) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: layer3Opacity,
          x: layer3X
        }}
      >
        <Image
          src="/Assets/Sh1.jpg"
          alt="Armor Layer 3"
          fill
          className="object-cover"
          style={{
            clipPath: 'polygon(0% 20%, 35% 20%, 35% 80%, 0% 80%)',
            filter: 'brightness(1.05)'
          }}
          quality={100}
        />
      </motion.div>

      {/* Layer 4 - Right Side (slides in from right) */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: layer4Opacity,
          x: layer4X
        }}
      >
        <Image
          src="/Assets/Sh1.jpg"
          alt="Armor Layer 4"
          fill
          className="object-cover"
          style={{
            clipPath: 'polygon(65% 20%, 100% 20%, 100% 80%, 65% 80%)',
            filter: 'brightness(1.05)'
          }}
          quality={100}
        />
      </motion.div>

      {/* Final highlight layer */}
      <motion.div
        className="absolute inset-0"
        style={{
          opacity: highlightOpacity
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(196, 30, 58, 0.2) 0%, transparent 70%)',
          }}
        />
      </motion.div>
    </div>
  )
}
