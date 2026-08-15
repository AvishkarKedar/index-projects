import { useEffect, useState } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'

export default function CursorSpotlight() {
  const [enabled, setEnabled] = useState(false)
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const springX = useSpring(x, { stiffness: 60, damping: 20 })
  const springY = useSpring(y, { stiffness: 60, damping: 20 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!isFine || reduced) return
    setEnabled(true)
    function handleMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [x, y])

  const background = useMotionTemplate`radial-gradient(600px circle at ${springX}px ${springY}px, rgb(var(--fg-rgb) / 0.05), transparent 70%)`

  if (!enabled) return null

  return <motion.div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1]" style={{ background }} />
}
