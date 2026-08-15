import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

export default function KonamiEasterEgg() {
  const [progress, setProgress] = useState(0)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key
      const expected = SEQUENCE[progress]
      if (key === expected) {
        const next = progress + 1
        if (next === SEQUENCE.length) {
          setUnlocked(true)
          setProgress(0)
        } else {
          setProgress(next)
        }
      } else {
        setProgress(key === SEQUENCE[0] ? 1 : 0)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [progress])

  useEffect(() => {
    if (!unlocked) return
    const timer = setTimeout(() => setUnlocked(false), 3200)
    return () => clearTimeout(timer)
  }, [unlocked])

  const particles = Array.from({ length: 20 })

  return (
    <AnimatePresence>
      {unlocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setUnlocked(false)}
          className="fixed inset-0 z-[400] flex cursor-pointer flex-col items-center justify-center gap-4 bg-bg/95 backdrop-blur-xl"
        >
          {particles.map((_, i) => {
            const angle = (i / particles.length) * Math.PI * 2
            const distance = 120 + (i % 4) * 40
            return (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                animate={{ x: Math.cos(angle) * distance, y: Math.sin(angle) * distance, opacity: 0, scale: 0 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute h-1.5 w-1.5 rounded-full bg-fg"
              />
            )
          })}
          <motion.p
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-xs uppercase tracking-widest text-fg/50"
          >
            Achievement Unlocked
          </motion.p>
          <motion.p
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="px-6 text-center text-2xl font-semibold text-fg sm:text-4xl"
          >
            🎮 Secret found — Avik Games says hi
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="font-mono text-[11px] uppercase tracking-widest text-fg/30"
          >
            Tap anywhere to close
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
