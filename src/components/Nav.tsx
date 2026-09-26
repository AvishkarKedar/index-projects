import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { PROFILE } from '../data/projects'
import { EASE } from '../lib/motion'
import { GitHubIcon, InstagramIcon, MailIcon, XIcon } from './Icons'

const links = [
  { n: '01', label: 'About', href: '#about' },
  { n: '02', label: 'Work', href: '#work' },
  { n: '03', label: 'Contact', href: '#contact' },
]

const socials = [
  { label: 'GitHub', href: PROFILE.github, Icon: GitHubIcon },
  { label: 'Instagram', href: PROFILE.instagram, Icon: InstagramIcon },
  { label: 'X', href: PROFILE.x, Icon: XIcon },
  { label: 'Email', href: `mailto:${PROFILE.email}`, Icon: MailIcon },
]

function Logo({ onClick }: { onClick?: () => void }) {
  const inner = (
    <span className="flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded border border-accent/70 font-mono text-sm font-bold text-accent">
        A
      </span>
      <span className="font-mono text-[13px] font-medium tracking-wide text-fg max-md:hidden">
        avishkark<span className="text-accent">.in</span>
      </span>
    </span>
  )
  return onClick ? (
    <button onClick={onClick} aria-label="Back to top" className="shrink-0">
      {inner}
    </button>
  ) : (
    <a href="#top" aria-label="Back to top" className="shrink-0">
      {inner}
    </a>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => setOpen(false), [location.pathname])

  function goSection(e: React.MouseEvent, href: string) {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      const el = document.getElementById(href.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      navigate(`/${href}`)
    }
  }

  const NavLinkList = ({ vertical = false }: { vertical?: boolean }) => (
    <ul className={vertical ? 'flex flex-col items-center gap-1' : 'flex items-center gap-7'}>
      {links.map((l) => (
        <li key={l.n} className={vertical ? 'py-2' : ''}>
          <a
            href={l.href}
            onClick={(e) => goSection(e, l.href)}
            className="group font-mono text-[13px] text-muted transition-colors hover:text-accent"
          >
            <span className="text-accent">{l.n}.</span> {l.label}
          </a>
        </li>
      ))}
    </ul>
  )

  const SocialRail = ({ vertical = false }: { vertical?: boolean }) => (
    <ul className={`flex items-center gap-5 ${vertical ? 'flex-col gap-6' : ''}`}>
      {socials.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target={href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={label}
            className="block text-muted transition-all duration-300 hover:-translate-y-1 hover:text-accent"
          >
            <Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  )

  return (
    <>
      {/* ——— mobile / tablet top bar ——— */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-bg/85 px-6 py-4 backdrop-blur-md lg:hidden">
        <Logo />
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="relative z-50 flex h-10 w-10 items-center justify-center"
        >
          <span className={`absolute h-[2px] w-6 bg-accent transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[6px]'}`} />
          <span className={`absolute h-[2px] w-6 bg-accent transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[6px]'}`} />
        </button>
      </header>

      {/* ——— mobile overlay ——— */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-card/98 backdrop-blur-lg lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col items-center gap-6">
                {links.map((l, i) => (
                  <motion.li
                    key={l.n}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: EASE }}
                  >
                    <a
                      href={l.href}
                      onClick={(e) => goSection(e, l.href)}
                      className="font-mono text-lg text-muted transition-colors hover:text-accent"
                    >
                      <span className="text-accent">{l.n}.</span> {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <SocialRail />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ——— desktop fixed left sidebar ——— */}
      <motion.header
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="fixed bottom-0 left-0 top-0 z-40 hidden w-[100px] flex-col items-center justify-between py-8 lg:flex"
      >
        <div>
          <Logo />
        </div>

        <nav aria-label="Primary" className="my-auto py-8">
          <NavLinkList vertical />
        </nav>

        <div className="flex flex-col items-center gap-8">
          <SocialRail vertical />
          <span aria-hidden className="block h-24 w-px bg-fg/20" />
        </div>
      </motion.header>
    </>
  )
}
