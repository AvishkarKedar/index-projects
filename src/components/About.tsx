import { motion } from 'framer-motion'
import { PROFILE } from '../data/projects'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

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
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <p className="mb-4 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
            <span className="text-fg/70">02</span>
            <span aria-hidden className="h-px w-8 bg-fg/25" />
            About
          </p>
          <h2 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-fg sm:text-6xl">
            Built in the dark, <span className="text-fg/40">for the light of day.</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
            className="space-y-6 text-[15px] leading-relaxed text-fg/60 sm:text-base"
          >
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
            <p className="border-l border-line pl-5 text-fg/80">
              If it can&apos;t run offline, it isn&apos;t finished.
            </p>
          </motion.div>

          <div className="grid gap-px bg-line sm:grid-cols-2">
            {principles.map((pr, i) => (
              <motion.div
                key={pr.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className="group bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-8"
              >
                <p className="mb-3 font-mono text-[10px] text-fg/30">P{i + 1}</p>
                <h3 className="mb-2.5 text-lg font-semibold tracking-tight text-fg">{pr.title}</h3>
                <p className="text-sm leading-relaxed text-fg/50">{pr.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-20"
        >
          <p className="mb-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/40">
            <span aria-hidden className="h-px w-8 bg-fg/25" />
            Tooling — what these things are made of
          </p>
          <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
            {stacks.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.07 }}
                className="bg-bg p-6 transition-colors duration-300 hover:bg-white/[0.03] sm:p-7"
              >
                <h4 className="mb-4 font-mono text-[11px] uppercase tracking-[0.25em] text-fg">{s.label}</h4>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-[13px] text-fg/55">
                      <span aria-hidden className="h-px w-3 bg-fg/30" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
