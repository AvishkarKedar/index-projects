import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, STATUS_LABEL, type Project } from '../data/projects'
import { EASE } from '../lib/motion'
import TransitionLink from './TransitionLink'
import TiltCard from './TiltCard'
import { SectionMark, FadeUp } from './Reveal'

function StatusPill({ status }: { status: Project['status'] }) {
  return (
    <span className="inline-flex items-center gap-2 border border-fg/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-fg/70">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'live' ? 'animate-pulse-soft bg-accent' : 'bg-fg/35'
        }`}
      />
      {STATUS_LABEL[status]}
    </span>
  )
}

/* ————————————————————————— DOSSIER OVERLAY ————————————————————————— */

function ProjectModal({
  project,
  index,
  onClose,
}: {
  project: Project
  index: number
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const d = project.details

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} details`}
    >
      <motion.button
        aria-label="Close details"
        className="absolute inset-0 cursor-default bg-bg/80 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 64, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.985 }}
        transition={{ duration: 0.55, ease: EASE }}
        className="modal-scroll relative max-h-[92svh] w-full max-w-5xl overflow-y-auto border border-fg/12 bg-bg shadow-[0_0_140px_rgba(255,90,31,0.05)] sm:max-h-[86vh]"
      >
        {/* Header — editorial plate */}
        <div className="relative overflow-hidden border-b border-line">
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 70% 120% at 85% 0%, rgba(255,90,31,0.09), transparent 60%)',
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[11rem] italic leading-none text-fg/[0.045] sm:text-[15rem]"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <div className="absolute right-5 top-5 sm:right-8 sm:top-6">
            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor="Close"
              className="group flex h-10 w-10 items-center justify-center border border-fg/15 text-fg/60 transition-all duration-300 hover:rotate-90 hover:border-fg hover:text-fg"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <div className="relative px-6 pb-7 pt-9 sm:px-10 sm:pb-9 sm:pt-12">
            <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/40">
              Entry {String(index + 1).padStart(2, '0')} — {project.year} — {project.tagline}
            </p>
            <h3 className="mt-2 font-serif text-4xl tracking-serifdisplay text-fg sm:text-6xl">
              {project.name}
              <span className="text-accent">.</span>
            </h3>
          </div>
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          {/* Meta strip */}
          <div className="mb-10 grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {[
              { k: 'Status', node: <StatusPill status={project.status} /> },
              { k: 'Year', node: <span className="font-mono text-sm text-fg">{project.year}</span> },
              {
                k: 'Repository',
                node: (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Open"
                    className="font-mono text-sm text-fg underline-grow"
                  >
                    GitHub ↗
                  </a>
                ),
              },
              {
                k: 'Live',
                node: project.live ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="Open"
                    className="font-mono text-sm text-fg underline-grow"
                  >
                    Open ↗
                  </a>
                ) : (
                  <span className="font-mono text-sm text-fg/30">Pending deploy</span>
                ),
              },
            ].map((m) => (
              <div key={m.k} className="bg-bg p-4">
                <p className="mb-2 font-mono text-[9px] uppercase tracking-[0.25em] text-fg/35">{m.k}</p>
                {m.node}
              </div>
            ))}
          </div>

          {/* Lead + stack tilt card */}
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
            <p className="text-lg leading-relaxed text-fg/85 sm:text-xl">{project.description}</p>
            <TiltCard className="glass p-6" maxTilt={4}>
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/35">Stack</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="border border-fg/12 px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg/70">
                    {t}
                  </span>
                ))}
              </div>
              {d.highlights && (
                <>
                  <p className="mb-3 mt-6 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/35">Highlights</p>
                  <ul className="space-y-1.5">
                    {d.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-xs text-fg/60">
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-accent/80" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </TiltCard>
          </div>

          {/* Dossier body */}
          <div className="space-y-10">
            <Section label="The build">{d.overview}</Section>

            <div>
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-fg/35">Capabilities</p>
              <ul className="divide-y divide-white/[0.07] border-y border-line">
                {d.features.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-4 py-3.5 text-sm text-fg/75 sm:text-[15px]">
                    <span className="font-mono text-[10px] text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <Section label="Architecture">{d.architecture}</Section>
            {d.story && <Section label="The story">{d.story}</Section>}
            {d.challenges && <Section label="Hard parts">{d.challenges}</Section>}
          </div>

          {/* Footer CTAs */}
          <div className="mt-12 flex flex-wrap gap-3 border-t border-line pt-8">
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="group relative flex items-center gap-2 overflow-hidden bg-fg px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-bg"
            >
              <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
              <span className="relative">View source</span>
              <span aria-hidden className="relative transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="flex items-center gap-2 border border-fg/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80 transition-colors hover:border-fg hover:text-fg"
              >
                Open live
                <span aria-hidden>↗</span>
              </a>
            )}
            <TransitionLink
              to={`/projects/${project.slug}`}
              data-cursor="Read"
              className="flex items-center gap-2 border border-fg/15 px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80 transition-colors hover:border-fg hover:text-fg"
            >
              Full case study
              <span aria-hidden>→</span>
            </TransitionLink>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg/35">{label}</p>
      <p className="max-w-3xl text-[15px] leading-relaxed text-fg/70">{children}</p>
    </div>
  )
}

/* ————————————————————————— INDEX LIST ————————————————————————— */

export default function Projects() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="projects" className="relative scroll-mt-20">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-20">
          <div>
            <SectionMark index="01" label="Project index" />
            <FadeUp delay={0.08}>
              <h2 className="mt-5 font-serif text-5xl tracking-serifdisplay text-fg sm:text-7xl">
                Shipped &amp; <em className="italic text-fg/45">shipping.</em>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.15} className="max-w-xs">
            <p className="text-sm leading-relaxed text-fg/45">
              Every entry is an open tab in my browser. Select one for the full dossier — architecture, story, and the hard parts.
            </p>
          </FadeUp>
        </div>

        <motion.ul
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="border-t border-line"
        >
          {projects.map((p, i) => (
            <motion.li
              key={p.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
            >
              <button
                onClick={() => setOpen(i)}
                data-cursor="Dossier"
                className="group relative block w-full border-b border-line text-left"
                aria-haspopup="dialog"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 px-2 py-7 sm:grid-cols-[3.5rem_1.4fr_1fr_auto_2.5rem] sm:gap-x-8 sm:px-4 sm:py-9">
                  <span className="font-mono text-[11px] text-fg/30 transition-colors duration-300 group-hover:text-accent">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-serif text-3xl tracking-serifdisplay text-fg transition-all duration-500 ease-out-expo group-hover:translate-x-2 group-hover:italic sm:text-5xl">
                    {p.name}
                  </span>
                  <span className="col-span-3 text-sm text-fg/45 sm:col-span-1 sm:text-[15px]">{p.tagline}</span>
                  <span className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 sm:flex">
                    <span className={`h-1.5 w-1.5 rounded-full ${p.status === 'live' ? 'animate-pulse-soft bg-accent' : 'bg-fg/30'}`} />
                    {STATUS_LABEL[p.status]} · {p.year}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center justify-self-end border border-fg/15 text-fg/40 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:border-accent group-hover:text-accent">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                      <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </div>
                {/* sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-white/[0.025] transition-transform duration-700 ease-out-expo group-hover:scale-x-100"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-0 bg-accent/70 transition-all duration-700 ease-out-expo group-hover:w-full"
                />
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30"
        >
          {String(projects.length).padStart(2, '0')} entries · {projects.filter((p) => p.live).length} live domains · updated{' '}
          {new Date().getFullYear()}
        </motion.p>
      </div>

      <AnimatePresence>
        {open !== null && <ProjectModal project={projects[open]} index={open} onClose={() => setOpen(null)} />}
      </AnimatePresence>
    </section>
  )
}
