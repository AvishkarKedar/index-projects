import { motion } from 'framer-motion'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-fg/30">
          <span className="h-1.5 w-1.5 rounded-full bg-fg" />
          © {new Date().getFullYear()} Avishkar Kedar
        </p>
        <nav className="flex flex-wrap items-center justify-center gap-6 font-mono text-[11px] uppercase tracking-widest text-fg/40">
          {links.map((l) => (
            <a key={l.href} href={l.href} data-cursor="Go" className="inline-block py-2 transition-colors hover:text-fg">
              {l.label}
            </a>
          ))}
          <ThemeToggle />
        </nav>
        <motion.a
          href="#top"
          data-cursor="Top"
          whileHover={{ y: -2 }}
          className="inline-block py-2 font-mono text-[11px] uppercase tracking-widest text-fg/40 transition-colors hover:text-fg"
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  )
}
