import { motion } from 'framer-motion'

const links = [
  { label: 'Email', value: 'avishkarkedar@gmail.com', href: 'mailto:avishkarkedar@gmail.com' },
  { label: 'GitHub', value: 'github.com/AvishkarKedar', href: 'https://github.com/AvishkarKedar' },
  { label: 'Site', value: 'avishkark.in', href: 'https://avishkark.in' },
  { label: 'Instagram', value: '@avishkar_kedar', href: 'https://instagram.com/avishkar_kedar' },
  { label: 'X', value: '@AvishkarKedar', href: 'https://x.com/AvishkarKedar' },
]

export default function Contact() {
  return (
    <section id="contact" className="px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-money">Index — 004</p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-4 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl"
        >
          Let's build something worth hosting.
        </motion.h2>
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass glow-border group block rounded-2xl p-6"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">{l.label}</p>
              <p className="mt-2 flex items-center justify-between text-lg text-white transition-colors group-hover:text-money">
                {l.value}
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
