import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import StatusDot from '../components/StatusDot'
import ProjectVisual from '../components/ProjectVisual'
import TransitionLink from '../components/TransitionLink'
import NotFound from './NotFound'

const ORIGINAL_TITLE = 'Avishkar Kedar — Projects'

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

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto max-w-3xl px-6 pb-24 pt-32"
    >
      <TransitionLink
        to="/#projects"
        data-cursor="Back"
        className="underline-grow inline-flex items-center gap-2 py-2 font-mono text-xs uppercase tracking-widest text-fg/50 hover:text-fg"
      >
        ← All projects
      </TransitionLink>

      <div className="mt-6 flex items-center justify-between">
        <StatusDot status={project.status} />
        <span className="font-mono text-xs uppercase tracking-widest text-fg/30">{project.year}</span>
      </div>

      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-fg sm:text-6xl">{project.name}</h1>
      <p className="mt-2 font-mono text-sm uppercase tracking-widest text-fg/60">{project.tagline}</p>

      <ProjectVisual project={project} index={index} />

      <div className="mt-8 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-fg px-6 py-2.5 font-semibold text-bg transition-transform hover:scale-105"
          >
            Visit ↗
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line px-6 py-2.5 text-fg/70 transition-colors hover:border-fg hover:text-fg"
        >
          Source ↗
        </a>
      </div>

      <section className="mt-12 space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">Overview</p>
        <p className="text-lg leading-relaxed text-fg/80">{project.details.overview}</p>
      </section>

      {project.details.story && (
        <section className="mt-10 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">The Story</p>
          <p className="text-base leading-relaxed text-fg/70">{project.details.story}</p>
        </section>
      )}

      <section className="mt-10 space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">Key Features</p>
        <ul className="space-y-2">
          {project.details.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-fg/70">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-fg/50" />
              {f}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">Architecture</p>
        <p className="text-sm leading-relaxed text-fg/70">{project.details.architecture}</p>
      </section>

      {project.details.challenges && (
        <section className="mt-10 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">Challenges & Solutions</p>
          <p className="text-sm leading-relaxed text-fg/70">{project.details.challenges}</p>
        </section>
      )}

      {project.details.highlights && project.details.highlights.length > 0 && (
        <section className="mt-10 space-y-3">
          <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">Highlights</p>
          <div className="flex flex-wrap gap-2">
            {project.details.highlights.map((h) => (
              <span key={h} className="rounded-full border border-fg/20 bg-fg/[0.04] px-3 py-1 text-xs text-fg/70">
                {h}
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10 space-y-3">
        <p className="font-mono text-[11px] uppercase tracking-widest text-fg/40">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fg/50">
              {tag}
            </span>
          ))}
        </div>
      </section>

      <div className="mt-14 border-t border-line pt-8">
        <TransitionLink
          to="/#projects"
          className="underline-grow inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg/60 hover:text-fg"
        >
          ← Back to all projects
        </TransitionLink>
      </div>
    </motion.article>
  )
}
