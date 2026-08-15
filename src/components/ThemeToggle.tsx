import { useEffect, useState } from 'react'

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
    <button
      onClick={toggle}
      aria-pressed={isLight}
      data-cursor="Theme"
      className="inline-block py-2 font-mono text-[11px] uppercase tracking-widest text-fg/40 underline-offset-4 transition-colors hover:text-fg hover:underline"
    >
      Theme: {isLight ? 'Light' : 'Dark'}
    </button>
  )
}
