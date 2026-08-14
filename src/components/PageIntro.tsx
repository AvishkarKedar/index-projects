import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export default function PageIntro() {
  const [show, setShow] = useState(false)
  const [done, setDone] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem('intro-shown')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!seen && !reduced) {
      setShow(true)
      setDone(false)
      sessionStorage.setItem('intro-shown', '1')
      const timer = setTimeout(() => setDone(true), 1900)
      return () => clearTimeout(timer)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && !done && (
        <motion.div
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center gap-6 bg-black"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.3em' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-sm uppercase text-white"
          >
            Avishkar Kedar
          </motion.p>
          <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '0%' }}
              transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              className="h-full w-full bg-white"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
