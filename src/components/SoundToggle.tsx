import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function SoundToggle() {
  const [muted, setMuted] = useState(true)
  const ctxRef = useRef<AudioContext | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('sound-enabled')
    setMuted(stored !== 'true')
  }, [])

  useEffect(() => {
    if (muted) return
    function playClick() {
      try {
        if (!ctxRef.current) ctxRef.current = new AudioContext()
        const ctx = ctxRef.current
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = 720
        gain.gain.setValueAtTime(0.06, ctx.currentTime)
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12)
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.12)
      } catch {
        // ignore audio errors (autoplay policy, unsupported browser)
      }
    }
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('[data-cursor]')
      if (target) playClick()
    }
    window.addEventListener('click', handleClick)
    return () => window.removeEventListener('click', handleClick)
  }, [muted])

  function toggle() {
    const next = !muted
    setMuted(next)
    localStorage.setItem('sound-enabled', String(!next))
  }

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      aria-label={muted ? 'Enable interface sound' : 'Mute interface sound'}
      aria-pressed={!muted}
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-[calc(1.25rem+env(safe-area-inset-left))] z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-black/60 text-sm text-white/60 backdrop-blur-xl transition-colors hover:border-white hover:text-white"
    >
      {muted ? '\uD83D\uDD07' : '\uD83D\uDD0A'}
    </motion.button>
  )
}
