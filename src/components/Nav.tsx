import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Magnetic from './Magnetic'
import ScrambleText from './ScrambleText'
import TransitionLink from './TransitionLink'
import { PROFILE } from '../data/projects'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
      let current = ''
      for (const l of links) {
        const el = document.getElementById(l.href.slice(1))
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = l.href
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function handleLinkClick() {
    setOpen(false)
  }

  const navLink = (l: (typeof links)[number]) =>
    isHome ? (
      <a
        key={l.href}
        href={l.href}
        onClick={handleLinkClick}
        data-cursor="Go"
        className={`flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] transition-colors duration-300 ${
          active === l.href ? 'text-fg' : 'text-fg/45 hover:text-fg'
        }`}
      >
        <span
          className={`inline-block h-1 w-1 rounded-full transition-colors duration-300 ${
            active === l.href ? 'bg-fg' : 'bg-fg/25'
          }`}
        />
        <ScrambleText text={l.label} />
      </a>
    ) : (
      <TransitionLink
        key={l.href}
        to={`/${l.href}`}
        onClick={handleLinkClick}
        data-cursor="Go"
        className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/45 transition-colors duration-300 hover:text-fg"
      >
        <span className="inline-block h-1 w-1 rounded-full bg-fg/25" />
        <ScrambleText text={l.label} />
      </TransitionLink>
    )

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed left-0 right-0 top-0 z-50 print:hidden transition-colors duration-500 ${
          scrolled || !isHome ? 'border-b border-line bg-bg/60 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <motion.div style={{ scaleX }} className="absolute bottom-0 left-0 right-0 h-px origin-left bg-fg/60" />
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 sm:px-8">
          <Magnetic strength={0.2}>
            {isHome ? (
              <a href="#top" data-cursor="Top" className="group flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-30" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg" />
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-fg">
                  AVISHKAR<span className="text-fg/40">.KEDAR</span>
                </span>
              </a>
            ) : (
              <TransitionLink to="/#top" data-cursor="Top" className="group flex items-center gap-2.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-fg opacity-30" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-fg" />
                </span>
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-fg">
                  AVISHKAR<span className="text-fg/40">.KEDAR</span>
                </span>
              </TransitionLink>
            )}
          </Magnetic>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {links.map(navLink)}
          </nav>

          <div className="flex items-center gap-3">
            <Magnetic strength={0.25}>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="hidden items-center gap-2 border border-line px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/70 transition-all duration-300 hover:border-fg hover:bg-fg hover:text-bg sm:flex"
              >
                GitHub
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line md:hidden"
            >
              <span className={`h-px w-4 bg-fg transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
              <span className={`h-px w-4 bg-fg transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-bg/95 px-6 pb-10 pt-28 backdrop-blur-2xl md:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="border-b border-line"
                >
                  {isHome ? (
                    <a
                      href={l.href}
                      onClick={handleLinkClick}
                      className="flex items-baseline gap-4 py-6 text-4xl font-semibold tracking-tight text-fg"
                    >
                      <span className="font-mono text-[11px] text-fg/30">0{i + 1}</span>
                      {l.label}
                    </a>
                  ) : (
                    <TransitionLink
                      to={`/${l.href}`}
                      onClick={handleLinkClick}
                      className="flex items-baseline gap-4 py-6 text-4xl font-semibold tracking-tight text-fg"
                    >
                      <span className="font-mono text-[11px] text-fg/30">0{i + 1}</span>
                      {l.label}
                    </TransitionLink>
                  )}
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col gap-4"
            >
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer"
                onClick={handleLinkClick}
                className="flex items-center justify-between border border-line px-5 py-3.5 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/70"
              >
                GitHub <span aria-hidden>↗</span>
              </a>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30">
                {PROFILE.name} — {PROFILE.location}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
