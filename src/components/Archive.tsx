import { projects } from '../data/projects'
import { FadeUp, SectionHeading } from './Reveal'
import { ExternalIcon, FolderIcon, GitHubIcon } from './Icons'
import { Link } from 'react-router-dom'

export default function Archive() {
  const rest = projects.filter((p) => !p.live)

  return (
    <section className="px-6 pb-24 sm:px-10">
      <div className="mx-auto w-full max-w-wrap">
        <SectionHeading index="03" title="Other noteworthy projects" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 0.06}>
              <Link
                to={`/projects/${p.slug}`}
                className="group flex h-full flex-col justify-between rounded bg-card p-6 shadow-card transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <FolderIcon className="h-9 w-9 text-accent" />
                    <div className="flex items-center gap-3 text-muted transition-colors group-hover:text-accent">
                      {p.repo && (
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${p.name} on GitHub`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <GitHubIcon className="h-[18px] w-[18px]" />
                        </a>
                      )}
                      <ExternalIcon className="h-[18px] w-[18px]" />
                    </div>
                  </div>
                  <h3 className="mt-6 text-xl font-bold tracking-tight text-fg transition-colors group-hover:text-accent">
                    {p.name}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.description}</p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-x-3.5 gap-y-1.5 font-mono text-[11px] text-muted/90">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Link>
            </FadeUp>
          ))}

          {/* index card */}
          <FadeUp delay={rest.length * 0.06}>
            <Link
              to="/projects/anonshare"
              className="group hidden h-full flex-col justify-center rounded border border-dashed border-fg/20 p-6 text-center transition-colors hover:border-accent sm:flex"
            >
              <p className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                Full dossiers live on each case page
              </p>
              <p className="mt-2 text-lg font-bold tracking-tight text-fg transition-colors group-hover:text-accent">
                Open one →
              </p>
            </Link>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
