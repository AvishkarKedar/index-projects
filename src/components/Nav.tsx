import { motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-line bg-black/70 backdrop-blur-md"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm tracking-widest text-white">
          AVISHKAR<span className="text-white/40">.KEDAR</span>
        </a>
        <nav className="hidden gap-8 font-mono text-xs uppercase tracking-widest text-white/60 sm:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="https://github.com/AvishkarKedar"
          target="_blank"
          rel="noreferrer"
          className="font-mono text-xs uppercase tracking-widest text-white/60 transition-colors hover:text-white"
        >
          GitHub ↗
        </a>
      </div>
    </motion.header>
  )
}
