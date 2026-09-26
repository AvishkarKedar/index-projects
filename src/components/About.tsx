import { PROFILE } from '../data/projects'
import { SectionMark, FadeUp } from './Reveal'

const principles = [
  {
    title: 'Privacy by default',
    body: 'Encryption happens in the browser before data ever leaves the device. Servers relay ciphertext, never plaintext.',
  },
  {
    title: 'Offline is a feature',
    body: 'Software should behave the same in a rural field with no signal as it does in a connected office.',
  },
  {
    title: 'No engines, no bloat',
    body: 'Plain JavaScript, Canvas, and careful engineering beat heavyweight dependencies when it matters.',
  },
  {
    title: 'Ship small, ship often',
    body: 'Every project here started as one annoying problem and ended as a tool anyone can open and use.',
  },
]

const stacks = [
  {
    label: 'Web',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'CodeMirror 6', 'Canvas API', 'PWA'],
  },
  {
    label: 'Real-time & Infra',
    items: ['Yjs CRDTs', 'Cloudflare Workers', 'AES-GCM', 'Vitest', 'GitHub Actions'],
  },
  {
    label: 'Mobile & Cross-platform',
    items: ['Flutter', 'Dart', 'Android', 'Windows', 'Firebase'],
  },
  {
    label: 'ML & Data',
    items: ['TensorFlow Lite', 'On-device inference', 'Model quantization', 'Dataset curation'],
  },
]

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 sm:px-8 sm:py-32">
        <div>
          <SectionMark index="02" label="About" />
          <FadeUp delay={0.08}>
            <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.05] tracking-serifdisplay text-fg sm:text-6xl">
              Built in the dark, <em className="italic text-fg/45">for the light of day.</em>
            </h2>
          </FadeUp>
        </div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <FadeUp delay={0.1} className="space-y-6 text-[15px] leading-relaxed text-fg/60 sm:text-base">
            <p>
              I&apos;m {PROFILE.fullName} — a student and independent builder who ships real software
              end to end: the model, the protocol, the interface, and the CI that verifies it. Every
              project in this index started as a personal annoyance that a whole category of tools
              refused to fix properly.
            </p>
            <p>
              The thread running through all of it is respect for the person on the other side: no
              accounts where a six-character code will do, no network calls where on-device inference
              works, no data leaving the browser unless it&apos;s encrypted first. Some of this ships to
              live domains today; the rest is one deploy away.
            </p>
            <p className="border-l-2 border-accent/70 pl-5 font-serif text-xl italic leading-snug tracking-serifdisplay text-fg/90">
              If it can&apos;t run offline, it isn&apos;t finished.
            </p>
          </FadeUp>

          <div className="grid gap-px bg-line sm:grid-cols-2">
            {principles.map((pr, i) => (
              <FadeUp key={pr.title} delay={i * 0.07} className="h-full">
                <div className="group flex h-full flex-col bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-8">
                  <p className="mb-4 font-serif text-3xl italic tracking-serifdisplay text-fg/25 transition-colors duration-300 group-hover:text-accent/80">
                    0{i + 1}
                  </p>
                  <h3 className="mb-2.5 text-lg font-medium tracking-tight text-fg">{pr.title}</h3>
                  <p className="text-sm leading-relaxed text-fg/50">{pr.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        <FadeUp className="mt-20">
          <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-fg/40">
            <span aria-hidden className="h-px w-8 bg-fg/25" />
            Tooling — what these things are made of
          </p>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stacks.map((s) => (
              <div
                key={s.label}
                className="group bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-7"
              >
                <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-fg/90">{s.label}</h4>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg/55">
                      <span
                        aria-hidden
                        className="h-px w-3 bg-fg/30 transition-colors duration-300 group-hover:bg-accent/70"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  )
}
