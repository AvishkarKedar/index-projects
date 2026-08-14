import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import RevealText from './RevealText'
import Magnetic from './Magnetic'

const links = [
  { label: 'Email', value: 'avishkarkedar@gmail.com', href: 'mailto:avishkarkedar@gmail.com' },
  { label: 'GitHub', value: 'github.com/AvishkarKedar', href: 'https://github.com/AvishkarKedar' },
  { label: 'Site', value: 'avishkark.in', href: 'https://avishkark.in' },
  { label: 'Instagram', value: '@avishkar_kedar', href: 'https://instagram.com/avishkar_kedar' },
  { label: 'X', value: '@AvishkarKedar', href: 'https://x.com/AvishkarKedar' },
]

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-white sm:text-6xl">
            <RevealText text="Let's build something worth hosting." inView />
          </h2>
          <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
            <Magnetic>
              <motion.button
                onClick={() => setFormOpen(true)}
                data-cursor="Contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                animate={{ boxShadow: ['0 0 0 0 rgba(255,255,255,0.35)', '0 0 0 20px rgba(255,255,255,0)'] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity, ease: 'easeOut' } }}
                className="rounded-full bg-white px-9 py-4 font-mono text-sm font-semibold uppercase tracking-widest text-black"
              >
                Contact Me ↗
              </motion.button>
            </Magnetic>
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Usually replies within 24–48 hours
            </p>
          </div>
        </div>
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
              whileHover={{ y: -3 }}
              data-cursor="Open"
              className="glass glow-border group block rounded-2xl p-6"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">{l.label}</p>
              <p className="mt-2 flex items-center justify-between text-lg text-white transition-colors group-hover:text-white/70">
                {l.value}
                <span className="transition-transform group-hover:translate-x-1">↗</span>
              </p>
            </motion.a>
          ))}
        </div>
      </div>
      <ContactForm open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
