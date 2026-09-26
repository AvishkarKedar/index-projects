import { PROFILE } from '../data/projects'
import { FadeUp, SectionHeading } from './Reveal'

const principles = [
  'Privacy by default — encryption happens in the browser, before data ever leaves the device.',
  'Offline is a feature — software should behave the same in a rural field as in a connected office.',
  'No engines, no bloat — plain JavaScript, Canvas, and careful engineering beat heavyweight dependencies.',
  'Ship small, ship often — every project started as one annoying problem and ended as a tool anyone can use.',
]

const stacks = [
  { label: 'Web', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Canvas API', 'PWA'] },
  { label: 'Real-time & Infra', items: ['Yjs CRDTs', 'Cloudflare Workers', 'AES-GCM', 'Vitest', 'GitHub Actions'] },
  { label: 'Mobile', items: ['Flutter', 'Dart', 'Android', 'Windows', 'Firebase'] },
  { label: 'ML & Data', items: ['TensorFlow Lite', 'On-device inference', 'Model quantization'] },
]

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-wrap">
        <SectionHeading index="01" title="About me" />

        <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <FadeUp delay={0.05} className="space-y-4 leading-relaxed text-muted">
            <p>
              I&apos;m <span className="font-medium text-fg">{PROFILE.fullName}</span> — a student and
              independent builder who ships real software end to end: the model, the protocol, the
              interface, and the CI that verifies it. Every project in this index started as a
              personal annoyance that a whole category of tools refused to fix properly.
            </p>
            <p>
              The thread running through all of it is respect for the person on the other side: no
              accounts where a six-character code will do, no network calls where on-device
              inference works, no data leaving the browser unless it&apos;s encrypted first. Some of
              this ships to live domains today; the rest is one deploy away.
            </p>
            <p className="font-mono text-sm text-accent">If it can&apos;t run offline, it isn&apos;t finished.</p>
          </FadeUp>

          <div className="space-y-8">
            <FadeUp delay={0.1}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                How I work
              </h3>
              <ul className="space-y-3">
                {principles.map((p, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <span className="mt-1.5 font-mono text-[10px] text-accent">{String(i + 1).padStart(2, '0')}</span>
                    {p}
                  </li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp delay={0.16}>
              <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-muted">
                What these things are made of
              </h3>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {stacks.map((s) => (
                  <div key={s.label}>
                    <p className="mb-2 text-sm font-semibold text-fg">{s.label}</p>
                    <ul className="space-y-1.5">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-2.5 font-mono text-xs text-muted">
                          <span aria-hidden className="text-accent">▹</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  )
}
