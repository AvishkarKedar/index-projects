import { useState } from 'react'
import ContactForm from './ContactForm'
import Magnetic from './Magnetic'
import { PROFILE, projects } from '../data/projects'
import { SectionMark, FadeUp } from './Reveal'

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
        <div>
          <SectionMark index="03" label="Contact" />
          <FadeUp delay={0.08}>
            <h2 className="mt-5 font-serif text-[13.5vw] leading-[0.95] tracking-serifdisplay text-fg sm:text-[9vw] lg:text-[7.2vw]">
              Find me in
              <br />
              <em className="italic text-fade-display">the open.</em>
            </h2>
          </FadeUp>
          <FadeUp delay={0.2} className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-md text-[15px] leading-relaxed text-fg/55 sm:text-base">
              Everything here is open source and reachable on the open web. No trackers, no
              middlemen — pick a link and it&apos;s just us.
            </p>
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <Magnetic strength={0.25}>
                <button
                  onClick={() => setFormOpen(true)}
                  data-cursor="Contact"
                  className="group relative flex items-center gap-2.5 overflow-hidden bg-fg px-7 py-3.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-bg"
                >
                  <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                  <span className="relative">Write to me</span>
                  <span aria-hidden className="relative inline-block transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </button>
              </Magnetic>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30">{PROFILE.availability}</p>
            </div>
          </FadeUp>
        </div>

        {/* Link grid */}
        <div className="mt-14 grid gap-px border border-fg/12 bg-line sm:grid-cols-2">
          {/* Email — with copy + form */}
          <FadeUp className="h-full">
            <div className="group relative flex h-full items-center justify-between gap-4 bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-8">
              <div className="min-w-0">
                <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/35">Email — fastest reply</p>
                <a
                  href={`mailto:${PROFILE.email}`}
                  data-cursor="Mail"
                  className="block truncate text-xl font-medium tracking-tight text-fg sm:text-2xl"
                >
                  {PROFILE.email}
                </a>
                <div className="mt-2 flex flex-wrap gap-3">
                  <button
                    onClick={copyEmail}
                    data-cursor="Copy"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45 transition-colors hover:text-accent"
                  >
                    {copied ? '✓ Copied' : 'Copy address'}
                  </button>
                  <span aria-hidden className="text-fg/20">/</span>
                  <button
                    onClick={() => setFormOpen(true)}
                    data-cursor="Form"
                    className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg/45 transition-colors hover:text-accent"
                  >
                    Or use the form
                  </button>
                </div>
              </div>
              <span
                aria-hidden
                className={`flex h-10 w-10 shrink-0 items-center justify-center border transition-all duration-300 ${
                  copied ? 'border-accent bg-accent text-bg' : 'border-fg/15 text-fg/60'
                }`}
              >
                {copied ? '✓' : '@'}
              </span>
            </div>
          </FadeUp>

          {[
            { label: 'GitHub', value: 'github.com/AvishkarKedar', href: PROFILE.github, note: 'Code, issues, releases' },
            { label: 'Site', value: 'avishkark.in', href: PROFILE.site, note: 'The main hub' },
            { label: 'Instagram', value: PROFILE.instagramHandle, href: PROFILE.instagram, note: 'Behind the scenes' },
            { label: 'X', value: PROFILE.xHandle, href: PROFILE.x, note: 'Notes & updates' },
          ].map((l, i) => (
            <FadeUp key={l.label} delay={(i + 1) * 0.07} className="h-full">
              <a
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="group relative flex h-full items-center justify-between gap-4 bg-bg p-6 transition-colors duration-300 hover:bg-fg sm:p-8"
              >
                <div className="min-w-0">
                  <p className="mb-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/35 transition-colors duration-300 group-hover:text-bg/50">
                    {l.label}
                  </p>
                  <p className="truncate text-xl font-medium tracking-tight text-fg transition-colors duration-300 group-hover:text-bg sm:text-2xl">
                    {l.value}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/30 transition-colors duration-300 group-hover:text-bg/60">
                    {l.note}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="flex h-10 w-10 shrink-0 items-center justify-center border border-fg/15 text-fg/60 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-bg/30 group-hover:text-bg"
                >
                  <svg width="12" height="12" viewBox="0 0 11 11" fill="none" aria-hidden>
                    <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </span>
              </a>
            </FadeUp>
          ))}
        </div>

        <FadeUp delay={0.15}>
          <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30">
            {liveDomains} live deployments · {projects.length} open-source repositories · zero trackers
          </p>
        </FadeUp>
      </div>

      {/* The contact form — straight to the inbox, unchanged behaviour */}
      <ContactForm open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
