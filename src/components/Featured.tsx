import { projects, STATUS_LABEL, type Project } from '../data/projects'
import { FadeUp, SectionHeading } from './Reveal'
import { ExternalIcon, GitHubIcon } from './Icons'
import { Link } from 'react-router-dom'

function FeaturedCard({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1

  return (
    <FadeUp>
      <article className="group relative grid gap-6 rounded bg-card p-5 shadow-card transition-transform duration-300 hover:-translate-y-1.5 sm:p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-10">
        {/* image */}
        <Link
          to={`/projects/${project.slug}`}
          className={`relative block overflow-hidden rounded border border-fg/10 ${
            flip ? 'lg:order-2' : ''
          }`}
        >
          <img
            src={project.image}
            alt={`${project.name} — ${project.tagline}`}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div aria-hidden className="absolute inset-0 bg-accent/10 opacity-100 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0" />
        </Link>

        {/* content */}
        <div className={flip ? 'lg:order-1 lg:text-right' : ''}>
          <div className={`flex items-center gap-3 ${flip ? 'lg:justify-end' : ''}`}>
            <span className="font-mono text-xs text-accent">Featured</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/80">
              {STATUS_LABEL[project.status]} · {project.year}
            </span>
          </div>
          <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-[1.7rem]">
            <Link
              to={`/projects/${project.slug}`}
              className="text-fg transition-colors hover:text-accent"
            >
              {project.name}
            </Link>
          </h3>
          <p className="mt-3 rounded bg-bg/60 p-4 text-sm leading-relaxed text-muted sm:text-[15px]">
            {project.description}
          </p>
          <ul className={`mt-4 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-xs text-muted ${flip ? 'lg:justify-end' : ''}`}>
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <div className={`mt-4 flex items-center gap-4 ${flip ? 'lg:justify-end' : ''}`}>
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="text-fg transition-colors hover:text-accent"
              >
                <GitHubIcon className="h-5 w-5" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} live site`}
                className="text-fg transition-colors hover:text-accent"
              >
                <ExternalIcon className="h-5 w-5" />
              </a>
            )}
            <Link
              to={`/projects/${project.slug}`}
              className="ml-1 font-mono text-xs text-accent underline-offset-4 hover:underline"
            >
              Read the case study →
            </Link>
          </div>
        </div>
      </article>
    </FadeUp>
  )
}

export default function Featured() {
  const featured = projects.filter((p) => p.live)

  return (
    <section id="work" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-wrap">
        <SectionHeading index="02" title="Things I've built" />

        <div className="mt-10 space-y-10">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
