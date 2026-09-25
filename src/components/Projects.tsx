import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { projects, STATUS_LABEL, type Project } from '../data/projects'
import TransitionLink from './TransitionLink'
import TiltCard from './TiltCard'
import Constellation from './Constellation'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function StatusPill({ status }: { status: Project['status'] }) {
  return (
    <span className="inline-flex items-center gap-2 border border-line px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.22em] text-fg/70">
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'live' ? 'animate-pulse-dot bg-fg' : 'bg-fg/35'
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
        initial={{ opacity: 0, y: 60, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.985 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="modal-scroll relative max-h-[92svh] w-full max-w-5xl overflow-y-auto border border-line bg-bg shadow-[0_0_120px_rgba(255,255,255,0.06)] sm:max-h-[86vh]"
      >
        {/* Constellation header */}
        <div className="relative border-b border-line">
          <Constellation
            slug={project.slug}
            label={`FIG. ${String(index + 1).padStart(2, '0')} — ${project.name.toUpperCase()}`}
            className="h-36 w-full sm:h-44"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-bg to-transparent" />
          <div className="absolute right-5 top-5 sm:right-8 sm:top-6">
            <button
              onClick={onClose}
              aria-label="Close"
              data-cursor="Close"
              className="group flex h-10 w-10 items-center justify-center border border-line text-fg/60 transition-all duration-300 hover:rotate-90 hover:border-fg hover:text-fg"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
          <div className="absolute bottom-5 left-6 sm:left-10">
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
              Entry {String(index + 1).padStart(2, '0')} — {project.year}
            </p>
            <h3 className="mt-1 text-3xl font-semibold tracking-tight text-fg sm:text-5xl">{project.name}</h3>
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
                  <span key={t} className="border border-line px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg/70">
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
                        <span className="mt-1.5 h-1 w-1 shrink-0 bg-fg/50" />
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
                    <span className="font-mono text-[10px] text-fg/30">{String(i + 1).padStart(2, '0')}</span>
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
              className="group flex items-center gap-2 bg-fg px-5 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-bg transition-colors hover:bg-fg/85"
            >
              View source
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="group flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80 transition-colors hover:border-fg hover:text-fg"
              >
                Open live
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
              </a>
            )}
            <TransitionLink
              to={`/projects/${project.slug}`}
              data-cursor="Read"
              className="group flex items-center gap-2 border border-line px-5 py-2.5 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/80 transition-colors hover:border-fg hover:text-fg"
            >
              Full case study
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6 sm:mb-20"
        >
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
              <span className="text-fg/70">01</span>
              <span aria-hidden className="h-px w-8 bg-fg/25" />
              Project index
            </p>
            <h2 className="text-4xl font-semibold tracking-[-0.03em] text-fg sm:text-6xl">
              Shipped &amp; shipping
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-fg/45">
            Every entry is an open tab in my browser. Select one for the full dossier — architecture, story, and the hard parts.
          </p>
        </motion.div>

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
                className="group relative block w-full border-b border-line text-left transition-colors duration-300 hover:bg-white/[0.025]"
                aria-haspopup="dialog"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-1 px-2 py-6 sm:grid-cols-[3rem_1fr_1.2fr_auto_2.5rem] sm:gap-x-8 sm:px-4 sm:py-8">
                  <span className="font-mono text-[11px] text-fg/30 transition-colors group-hover:text-fg/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-2xl font-semibold tracking-tight text-fg transition-transform duration-500 group-hover:translate-x-1.5 sm:text-4xl">
                    {p.name}
                  </span>
                  <span className="col-span-3 text-sm text-fg/45 sm:col-span-1 sm:text-[15px]">{p.tagline}</span>
                  <span className="hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/40 sm:flex">
                    <span className={`h-1.5 w-1.5 rounded-full ${p.status === 'live' ? 'bg-fg' : 'bg-fg/30'}`} />
                    {STATUS_LABEL[p.status]} · {p.year}
                  </span>
                  <span className="flex h-9 w-9 items-center justify-center justify-self-end border border-line text-fg/40 transition-all duration-300 group-hover:rotate-45 group-hover:border-fg group-hover:text-fg">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                      <path d="M1 10L10 1M10 1H2.5M10 1V8.5" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </div>
                {/* Mini constellation on hover */}
                <Constellation
                  slug={p.slug}
                  animate={false}
                  className="pointer-events-none absolute right-24 top-1/2 hidden h-16 w-40 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover:opacity-100 lg:block"
                />
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 h-px w-0 bg-fg/60 transition-all duration-500 group-hover:w-full"
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
