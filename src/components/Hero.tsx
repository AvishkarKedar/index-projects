import { PROFILE, projects } from '../data/projects'
import { FadeUp } from './Reveal'
import { ArrowDownIcon } from './Icons'

export default function Hero() {
  return (
    <section id="top" className="flex min-h-[100svh] flex-col justify-center px-6 pb-16 pt-28 sm:px-10 lg:pl-[calc(100px+3rem)] lg:pr-10">
      <div className="mx-auto w-full max-w-wrap">
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <FadeUp>
              <p className="font-mono text-sm text-accent sm:text-base">Hi, my name is</p>
            </FadeUp>
            <FadeUp delay={0.08}>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-fg sm:text-6xl lg:text-7xl">
                {PROFILE.name}.
              </h1>
            </FadeUp>
            <FadeUp delay={0.16}>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-muted sm:text-5xl lg:text-6xl">
                I build things that respect people.
              </h2>
            </FadeUp>
            <FadeUp delay={0.24}>
              <p className="mt-6 max-w-xl leading-relaxed text-muted">
                I&apos;m a student and independent developer focused on shipping real, end-to-end
                software — encrypted collaboration, on-device machine learning, and offline-capable
                tools. Nothing I build phones home. This site is the index of it all.
              </p>
            </FadeUp>
            <FadeUp delay={0.32}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#work"
                  className="group inline-flex items-center gap-2.5 rounded border border-accent px-6 py-3.5 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent/10"
                >
                  Check out my work
                  <ArrowDownIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
                </a>
                <span className="font-mono text-xs text-muted/80">
                  {String(projects.length).padStart(2, '0')} projects · {projects.filter((p) => p.live).length} live
                </span>
              </div>
            </FadeUp>
          </div>

          {/* framed visual — accent plate behind, real project shot inside */}
          <FadeUp delay={0.3} className="relative mx-auto hidden w-full max-w-[340px] sm:block lg:max-w-none">
            <div className="group relative">
              <div
                aria-hidden
                className="absolute -inset-0 translate-x-4 translate-y-4 rounded border border-accent/60 transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"
              />
              <div className="relative overflow-hidden rounded bg-card shadow-card">
                <img
                  src="/work/anonshare.jpg"
                  alt="Preview of anonshare — encrypted collaborative editor"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="eager"
                />
                <div aria-hidden className="absolute inset-0 bg-accent/10 mix-blend-multiply" />
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  )
}
