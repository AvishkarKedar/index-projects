import { useEffect, useState } from 'react'

export default function TypingText({
  text,
  className = '',
  speed = 28,
  startDelay = 0,
}: {
  text: string
  className?: string
  speed?: number
  startDelay?: number
}) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setCount(text.length)
      return
    }
    let i = 0
    let interval: ReturnType<typeof setInterval> | undefined
    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        i++
        setCount(i)
        if (i >= text.length && interval) clearInterval(interval)
      }, speed)
    }, startDelay)
    return () => {
      clearTimeout(startTimer)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, startDelay])

  return (
    <span className={className}>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span className="typing-cursor" />
      </span>
      <span className="sr-only">{text}</span>
    </span>
  )
}
