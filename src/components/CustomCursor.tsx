import { useEffect, useState } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion()
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState('')
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 })

  useEffect(() => {
    const isFine = window.matchMedia('(pointer: fine)').matches
    if (!isFine || shouldReduceMotion) return

    setEnabled(true)
    document.documentElement.style.cursor = 'none'

    function handleMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement)?.closest('[data-cursor]') as HTMLElement | null
      setHovering(!!target)
      setLabel(target?.getAttribute('data-cursor') || '')
    }

    window.addEventListener('mousemove', handleMove)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.style.cursor = ''
    }
  }, [shouldReduceMotion, x, y])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference"
      style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        animate={{ width: hovering ? 64 : 10, height: hovering ? 64 : 10 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-center rounded-full bg-white"
      >
        {hovering && label && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="font-mono text-[9px] uppercase tracking-widest text-black"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}
