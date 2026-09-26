import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/**
 * First-visit intro: a mono wordmark, a counting serif numeral and a
 * hairline progress bar, lifted away with a clip wipe. Runs once per
 * session and never for reduced-motion users.
 */
export default function PageIntro() {
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(true)
  const counterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const seen = sessionStorage.getItem('intro-shown')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!seen && !reduced) {
      setShow(true)
      setDone(false)
      sessionStorage.setItem('intro-shown', '1')

      const start = performance.now()
      const DURATION = 1500
      let raf = 0
      const step = (now: number) => {
        const p = Math.min((now - start) / DURATION, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(eased * 100)).padStart(3, '0')
        }
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
      const timer = setTimeout(() => setDone(true), 1900)
      return () => {
        cancelAnimationFrame(raf)
        clearTimeout(timer)
      }
    }
  }, [])

  return (
    <AnimatePresence>
      {show && !done && (
        <motion.div
          exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.7, ease: EASE } }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-8 bg-bg"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.6em' }}
            animate={{ opacity: 1, letterSpacing: '0.32em' }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-mono text-[11px] uppercase text-fg/60"
          >
            Avishkar Kedar — Project Index
          </motion.p>
          <div className="flex items-end gap-3">
            <span
              ref={counterRef}
              className="font-serif text-7xl leading-none tracking-serifdisplay text-fg"
            >
              000
            </span>
            <span className="mb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-accent">Init</span>
          </div>
          <div className="h-px w-48 overflow-hidden bg-fg/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.5, ease: EASE }}
              className="h-full w-full origin-left bg-accent"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
