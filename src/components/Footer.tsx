import { motion } from 'framer-motion'

const links = [
  { label: 'Work', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
        <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/30">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          © {new Date().getFullYear()} Avishkar Kedar
        </p>
        <nav className="flex gap-6 font-mono text-[11px] uppercase tracking-widest text-white/40">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-white">
              {l.label}
            </a>
          ))}
        </nav>
        <motion.a
          href="#top"
          whileHover={{ y: -2 }}
          className="font-mono text-[11px] uppercase tracking-widest text-white/40 transition-colors hover:text-white"
        >
          Back to top ↑
        </motion.a>
      </div>
    </footer>
  )
}
