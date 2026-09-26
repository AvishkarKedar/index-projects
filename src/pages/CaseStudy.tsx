import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects, STATUS_LABEL } from '../data/projects'
import { EASE } from '../lib/motion'
import { FadeUp } from '../components/Reveal'
import { ExternalIcon, GitHubIcon } from '../components/Icons'
import NotFound from './NotFound'

const ORIGINAL_TITLE = 'Avishkar Kedar — Project Index'

export default function CaseStudy() {
  const { slug } = useParams()
  const index = projects.findIndex((p) => p.slug === slug)
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]

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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      className="px-6 pb-24 pt-28 sm:px-10 lg:pl-[calc(100px+3rem)]"
    >
      <div className="mx-auto w-full max-w-[64rem]">
        <Link
          to="/#work"
          className="font-mono text-sm text-accent underline-offset-4 hover:underline"
        >
          ← Back to all projects
        </Link>

        {/* header */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-xs text-muted">
              <span className="text-accent">Case {String(index + 1).padStart(2, '0')}</span> · {project.year} ·{' '}
              {STATUS_LABEL[project.status]}
            </p>
          </div>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-fg sm:text-6xl">{project.name}</h1>
          <p className="mt-3 text-xl font-medium text-muted sm:text-2xl">{project.tagline}</p>
        </header>

        {/* cover */}
        {project.image && (
          <div className="mt-10 overflow-hidden rounded border border-fg/10 bg-card shadow-card">
            <img
              src={project.image}
              alt={`${project.name} — ${project.tagline}`}
              className="aspect-[16/9] w-full object-cover"
            />
          </div>
        )}

        {/* actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-accent px-5 py-2.5 font-mono text-xs text-accent transition-colors hover:bg-accent/10"
            >
              Visit live <ExternalIcon className="h-3.5 w-3.5" />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded border border-fg/25 px-5 py-2.5 font-mono text-xs text-fg transition-colors hover:border-accent hover:text-accent"
            >
              Source <GitHubIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        {/* lead */}
        <FadeUp className="mt-12">
          <p className="text-lg leading-relaxed text-fg/90 sm:text-xl">{project.description}</p>
        </FadeUp>

        {/* body */}
        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_240px] lg:gap-16">
          <div className="space-y-12">
            <Block label="Overview">
              <p className="leading-relaxed text-muted">{d.overview}</p>
            </Block>

            <Block label="Key features">
              <ul className="divide-y divide-fg/10 border-y border-line">
                {d.features.map((f, i) => (
                  <li key={f} className="flex items-baseline gap-4 py-3.5 text-[15px] text-muted">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </Block>

            <Block label="Architecture">
              <p className="leading-relaxed text-muted">{d.architecture}</p>
            </Block>

            {d.story && (
              <Block label="The story">
                <p className="leading-relaxed text-muted">{d.story}</p>
              </Block>
            )}

            {d.challenges && (
              <Block label="Hard parts">
                <p className="leading-relaxed text-muted">{d.challenges}</p>
              </Block>
            )}

            {d.highlights && d.highlights.length > 0 && (
              <Block label="Highlights">
                <div className="flex flex-wrap gap-2">
                  {d.highlights.map((h) => (
                    <span key={h} className="rounded-full border border-accent/40 bg-accent/5 px-3 py-1 text-xs text-accent">
                      {h}
                    </span>
                  ))}
                </div>
              </Block>
            )}
          </div>

          {/* meta rail */}
          <aside className="lg:pt-1">
            <div className="space-y-6 lg:sticky lg:top-28 lg:border-l lg:border-line lg:pl-6">
              <MetaRow k="Status" v={STATUS_LABEL[project.status]} accent={project.status === 'live'} />
              <MetaRow k="Year" v={project.year} />
              <MetaRow k="Stack" v={project.tags.join(' · ')} />
              <MetaRow k="Repository" v="GitHub ↗" href={project.repo} />
              {project.live && <MetaRow k="Live" v="Open ↗" href={project.live} />}
            </div>
          </aside>
        </div>

        {/* next */}
        <Link to={`/projects/${next.slug}`} className="group mt-20 block border-t border-line pt-10">
          <p className="font-mono text-xs text-muted">Next case</p>
          <p className="mt-3 text-3xl font-bold tracking-tight text-fg transition-colors group-hover:text-accent sm:text-4xl">
            {next.name} →
          </p>
          <p className="mt-1.5 text-muted">{next.tagline}</p>
        </Link>
      </div>
    </motion.article>
  )
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-fg">
        <span className="text-accent">▹</span>
        {label}
      </p>
      {children}
    </section>
  )
}

function MetaRow({ k, v, href, accent = false }: { k: string; v: string; href?: string; accent?: boolean }) {
  const content = (
    <>
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/80">{k}</p>
      <p className={`mt-1 font-mono text-xs ${accent ? 'text-accent' : 'text-muted'}`}>{v}</p>
    </>
  )
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  )
}
