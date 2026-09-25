import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import Magnetic from './Magnetic'
import { PROFILE, projects } from '../data/projects'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const liveDomains = projects.filter((p) => p.live).length

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard unavailable — the mailto link right beside it still works
    }
  }

  return (
    <section id="contact" className="relative scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 pb-16 pt-24 sm:px-8 sm:pb-20 sm:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
            <span className="text-fg/70">03</span>
            <span aria-hidden className="h-px w-8 bg-fg/25" />
            Contact
          </p>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="text-[13vw] font-semibold leading-[0.9] tracking-[-0.04em] text-fg sm:text-[9vw] lg:text-[7vw]">
              Find me in
              <br />
              <span className="text-fade-display">the open.</span>
            </h2>
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <Magnetic strength={0.25}>
                <motion.button
                  onClick={() => setFormOpen(true)}
                  data-cursor="Contact"
                  whileTap={{ scale: 0.97 }}
                  className="pulse-ring group flex items-center gap-2.5 bg-fg px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bg transition-colors hover:bg-fg/85"
                >
                  Write to me
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </motion.button>
              </Magnetic>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30">{PROFILE.availability}</p>
            </div>
          </div>
          <p className="mt-8 max-w-md text-[15px] leading-relaxed text-fg/55 sm:text-base">
            Everything here is open source and reachable on the open web. No trackers, no
            middlemen — pick a link and it&apos;s just us.
          </p>
        </motion.div>

        {/* Link grid */}
        <div className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {/* Email — with copy + form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="group relative flex items-center justify-between gap-4 bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-8"
          >
            <div className="min-w-0">
              <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/35">Email — fastest reply</p>
              <a
                href={`mailto:${PROFILE.email}`}
                data-cursor="Mail"
                className="block truncate text-xl font-semibold tracking-tight text-fg sm:text-2xl"
              >
                {PROFILE.email}
              </a>
              <div className="mt-2 flex flex-wrap gap-3">
                <button
                  onClick={copyEmail}
                  data-cursor="Copy"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45 transition-colors hover:text-fg"
                >
                  {copied ? '✓ Copied' : 'Copy address'}
                </button>
                <span aria-hidden className="text-fg/20">/</span>
                <button
                  onClick={() => setFormOpen(true)}
                  data-cursor="Form"
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45 transition-colors hover:text-fg"
                >
                  Or use the form
                </button>
              </div>
            </div>
            <span
              aria-hidden
              className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                copied ? 'border-fg bg-fg text-bg' : 'border-line text-fg/60'
              }`}
            >
              {copied ? '✓' : '@'}
            </span>
          </motion.div>

          {[
            { label: 'GitHub', value: 'github.com/AvishkarKedar', href: PROFILE.github, note: 'Code, issues, releases' },
            { label: 'Site', value: 'avishkark.in', href: PROFILE.site, note: 'The main hub' },
            { label: 'Instagram', value: PROFILE.instagramHandle, href: PROFILE.instagram, note: 'Behind the scenes' },
            { label: 'X', value: PROFILE.xHandle, href: PROFILE.x, note: 'Notes & updates' },
          ].map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, ease: EASE, delay: (i + 1) * 0.07 }}
              data-cursor="Open"
              className="group relative flex items-center justify-between gap-4 bg-bg p-6 transition-colors duration-300 hover:bg-fg sm:p-8"
            >
              <div className="min-w-0">
                <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/35 transition-colors duration-300 group-hover:text-bg/50">
                  {l.label}
                </p>
                <p className="truncate text-xl font-semibold tracking-tight text-fg transition-colors duration-300 group-hover:text-bg sm:text-2xl">
                  {l.value}
                </p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30 transition-colors duration-300 group-hover:text-bg/60">
                  {l.note}
                </p>
              </div>
              <span
                aria-hidden
                className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-fg/60 transition-all duration-300 group-hover:rotate-45 group-hover:border-bg/30 group-hover:text-bg"
              >
                <svg width="12" height="12" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </span>
            </motion.a>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30"
        >
          {liveDomains} live deployments · {projects.length} open-source repositories · zero trackers
        </motion.p>
      </div>

      {/* The contact form — straight to the inbox, unchanged behaviour */}
      <ContactForm open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
