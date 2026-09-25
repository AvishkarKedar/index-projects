import Magnetic from './Magnetic'
import { PROFILE, projects } from '../data/projects'

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-line print:hidden">
      <div className="mx-auto max-w-[1440px] px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40">
            © {new Date().getFullYear()} {PROFILE.name}
          </p>

          <div className="flex items-center gap-6">
            {[
              { label: 'Email', href: `mailto:${PROFILE.email}` },
              { label: 'GitHub', href: PROFILE.github },
              { label: 'X', href: PROFILE.x },
              { label: 'Instagram', href: PROFILE.instagram },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                data-cursor="Open"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40 transition-colors hover:text-fg"
              >
                {l.label}
              </a>
            ))}
          </div>

          <Magnetic strength={0.3}>
            <a
              href="#top"
              data-cursor="Top"
              className="group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/50 transition-colors hover:text-fg"
            >
              Back to top
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </a>
          </Magnetic>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fg/25">
            No cookies · No analytics · No trackers
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-fg/25">
            {projects.length} entries · Built in the dark
          </p>
        </div>
      </div>
    </footer>
  )
}
