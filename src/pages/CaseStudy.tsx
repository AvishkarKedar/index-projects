import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { EASE } from '../lib/motion'
import StatusDot from '../components/StatusDot'
import ProjectVisual from '../components/ProjectVisual'
import TransitionLink from '../components/TransitionLink'
import NotFound from './NotFound'

const ORIGINAL_TITLE = 'Avishkar Kedar — Project Index'

export default function CaseStudy() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]

  useEffect(() => {
    window.scrollTo(0, 0)
    if (project) document.title = `${project.name} — Avishkar Kedar`
    return () => {
      document.title = ORIGINAL_TITLE
    }
  }, [project])

  if (!project) return <NotFound />

  const d = project.details

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE }}
      className="mx-auto max-w-[1100px] px-6 pb-24 pt-32 sm:px-8"
    >
      <TransitionLink
        to="/#projects"
        data-cursor="Back"
        className="underline-grow inline-flex items-center gap-2 py-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/50 transition-colors hover:text-fg"
      >
        ← All projects
      </TransitionLink>

      {/* editorial header */}
      <header className="mt-10 border-b border-line pb-10">
        <div className="flex items-center justify-between">
          <StatusDot status={project.status} />
          <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/30">
            Case {String(index + 1).padStart(2, '0')} — {project.year}
          </span>
        </div>
        <h1 className="mt-6 font-serif text-6xl tracking-serifdisplay text-fg sm:text-8xl">
          {project.name}
          <span className="text-accent">.</span>
        </h1>
        <p className="mt-4 font-serif text-2xl italic tracking-serifdisplay text-fg/50 sm:text-3xl">
          {project.tagline}
        </p>
      </header>

      {/* lead + actions */}
      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <p className="text-xl leading-relaxed text-fg/85 sm:text-2xl">{project.description}</p>
        <div className="flex flex-col gap-5 lg:items-end">
          <div className="flex flex-wrap gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                data-cursor="Open"
                className="group relative flex items-center gap-2 overflow-hidden bg-fg px-6 py-3 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-bg"
              >
                <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                <span className="relative">Visit ↗</span>
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              data-cursor="Open"
              className="border border-fg/15 px-6 py-3 font-mono text-[10.5px] uppercase tracking-[0.2em] text-fg/70 transition-colors hover:border-fg hover:text-fg"
            >
              Source ↗
            </a>
          </div>
          <div className="flex flex-wrap gap-2 lg:justify-end">
            {project.tags.map((tag) => (
              <span key={tag} className="border border-fg/12 px-2.5 py-1 font-mono text-[10px] tracking-wide text-fg/55">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <ProjectVisual project={project} index={index} />

      {/* body */}
      <div className="grid gap-12 lg:grid-cols-[1fr_260px] lg:gap-16">
        <div className="space-y-12">
          <Section label="Overview">
            <p className="text-lg leading-relaxed text-fg/80">{d.overview}</p>
          </Section>

          <Section label="Key features">
            <ul className="divide-y divide-white/[0.07] border-y border-line">
              {d.features.map((f, i) => (
                <li key={f} className="flex items-baseline gap-4 py-3.5 text-[15px] text-fg/75">
                  <span className="font-mono text-[10px] text-accent/70">{String(i + 1).padStart(2, '0')}</span>
                  {f}
                </li>
              ))}
            </ul>
          </Section>

          <Section label="Architecture">
            <p className="leading-relaxed text-fg/70">{d.architecture}</p>
          </Section>

          {d.story && (
            <Section label="The story">
              <p className="leading-relaxed text-fg/70">{d.story}</p>
            </Section>
          )}

          {d.challenges && (
            <Section label="Hard parts">
              <p className="leading-relaxed text-fg/70">{d.challenges}</p>
            </Section>
          )}

          {d.highlights && d.highlights.length > 0 && (
            <Section label="Highlights">
              <div className="flex flex-wrap gap-2">
                {d.highlights.map((h) => (
                  <span key={h} className="border border-fg/15 bg-fg/[0.04] px-3 py-1 text-xs text-fg/70">
                    {h}
                  </span>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* sticky meta rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 space-y-6 border-l border-line pl-6">
            <MetaRow k="Status" v={project.status === 'live' ? 'Live' : 'In build'} accent={project.status === 'live'} />
            <MetaRow k="Year" v={project.year} />
            <MetaRow k="Stack" v={project.tags.slice(0, 3).join(' · ')} />
            <MetaRow k="Repository" v="GitHub ↗" href={project.repo} />
            {project.live && <MetaRow k="Live" v="Open ↗" href={project.live} />}
          </div>
        </aside>
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <TransitionLink
          to="/#projects"
          className="underline-grow inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/60 transition-colors hover:text-fg"
        >
          ← Back to all projects
        </TransitionLink>
      </div>
    </motion.article>
  )
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.28em] text-fg/40">
        <span aria-hidden className="h-px w-6 bg-accent/60" />
        {label}
      </p>
      {children}
    </section>
  )
}

function MetaRow({
  k,
  v,
  href,
  accent = false,
}: {
  k: string
  v: string
  href?: string
  accent?: boolean
}) {
  const content = (
    <>
      <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fg/35">{k}</p>
      <p className={`mt-1 font-mono text-[12px] ${accent ? 'text-accent' : 'text-fg/75'}`}>{v}</p>
    </>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" data-cursor="Open" className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}
