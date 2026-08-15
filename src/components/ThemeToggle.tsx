import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    setIsLight(document.documentElement.classList.contains('light'))
  }, [])

  function toggle() {
    const next = !isLight
    setIsLight(next)
    document.documentElement.classList.toggle('light', next)
    localStorage.setItem('theme', next ? 'light' : 'dark')
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', next ? '#ffffff' : '#000000')
  }

  return (
    <motion.button
      onClick={toggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.6 }}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-pressed={isLight}
      data-cursor="Theme"
      className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] left-[calc(1.25rem+env(safe-area-inset-left))] z-40 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg/60 text-fg/70 backdrop-blur-xl transition-colors hover:border-fg hover:text-fg"
    >
      <motion.span
        key={isLight ? 'sun' : 'moon'}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="text-base"
        aria-hidden="true"
      >
        {isLight ? '\u2600\uFE0F' : '\uD83C\uDF19'}
      </motion.span>
    </motion.button>
  )
}
