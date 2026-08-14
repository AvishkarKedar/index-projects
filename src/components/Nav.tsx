import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Magnetic from './Magnetic'
import ScrambleText from './ScrambleText'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  function handleLinkClick() {
    setOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-black/60 backdrop-blur-xl"
      >
        <motion.div style={{ scaleX }} className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-white" />
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Magnetic strength={0.2}>
            <a href="#top" data-cursor="Top" className="font-mono text-sm tracking-widest text-white">
              AVISHKAR<span className="text-white/40">.KEDAR</span>
            </a>
          </Magnetic>
          <nav className="hidden gap-1 rounded-full border border-line p-1 font-mono text-xs uppercase tracking-widest text-white/70 sm:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-cursor="Go"
                className="rounded-full px-4 py-2 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ScrambleText text={l.label} />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Magnetic strength={0.3} className="hidden sm:inline-block">
              <a
                href="https://github.com/AvishkarKedar"
                target="_blank"
                rel="noreferrer"
                data-cursor="Visit"
                className="rounded-full bg-white px-4 py-2 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
              >
                GitHub ↗
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-line sm:hidden"
            >
              <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }} className="block h-[1.5px] w-5 bg-white" />
              <motion.span animate={{ opacity: open ? 0 : 1 }} className="block h-[1.5px] w-5 bg-white" />
              <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }} className="block h-[1.5px] w-5 bg-white" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/95 backdrop-blur-xl sm:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={handleLinkClick}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="font-mono text-2xl uppercase tracking-widest text-white"
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="https://github.com/AvishkarKedar"
              target="_blank"
              rel="noreferrer"
              onClick={handleLinkClick}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + links.length * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 rounded-full bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-black"
            >
              GitHub ↗
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
