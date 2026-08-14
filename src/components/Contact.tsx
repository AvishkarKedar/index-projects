import { motion } from 'framer-motion'

const links = [
  { label: 'Email', value: 'astro.avishkar@gmail.com', href: 'mailto:astro.avishkar@gmail.com' },
  { label: 'GitHub', value: 'github.com/AvishkarKedar', href: 'https://github.com/AvishkarKedar' },
  { label: 'Site', value: 'avishkark.in', href: 'https://avishkark.in' },
]

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Index — 004</p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
        >
          Let's build something worth hosting.
        </motion.h2>
        <div className="mt-16 grid grid-cols-1 gap-8 border-t border-line pt-10 sm:grid-cols-3">
          {links.map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" className="group block">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">{l.label}</p>
              <p className="mt-2 text-lg text-white transition-colors group-hover:text-white/60">{l.value} ↗</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
