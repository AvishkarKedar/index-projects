import { useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

export default function ScrambleText({ text, className = '' }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const rafId = useRef<number | undefined>(undefined)

  function scramble() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let iteration = 0
    const totalFrames = text.length * 3
    if (rafId.current) cancelAnimationFrame(rafId.current)

    function tick() {
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < iteration / 3) return text[i]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )
      iteration++
      if (iteration <= totalFrames) {
        rafId.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }
    rafId.current = requestAnimationFrame(tick)
  }

  function reset() {
    if (rafId.current) cancelAnimationFrame(rafId.current)
    setDisplay(text)
  }

  return (
    <span onMouseEnter={scramble} onMouseLeave={reset} className={`inline-block ${className}`}>
      {display}
    </span>
  )
}
