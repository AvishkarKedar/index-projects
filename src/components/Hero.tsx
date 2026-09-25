import { motion, useReducedMotion } from 'framer-motion'
import { PROFILE, projects } from '../data/projects'
import Magnetic from './Magnetic'
import ScrambleText from './ScrambleText'

const liveCount = projects.filter((p) => p.status === 'live').length
const buildingCount = projects.filter((p) => p.status !== 'live').length

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

function RevealLine({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '115%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden">
      <div className="h-20" />

      {/* Corner registration marks */}
      <div aria-hidden className="pointer-events-none absolute inset-x-5 top-24 hidden justify-between text-fg/25 sm:flex sm:px-3">
        <span className="font-mono text-sm leading-none">+</span>
        <span className="font-mono text-sm leading-none">+</span>
      </div>

      <div className="mx-auto w-full max-w-[1440px] px-5 pt-14 sm:px-8 sm:pt-20 lg:pt-24">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/50 sm:mb-12 sm:text-[11px]"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-fg" />
            Project Index — {new Date().getFullYear()}
          </span>
          <span aria-hidden className="hidden h-px w-10 bg-fg/20 sm:inline-block" />
          <span>{PROFILE.role}</span>
          <span aria-hidden className="hidden h-px w-10 bg-fg/20 sm:inline-block" />
          <span>Privacy-first · Offline-capable</span>
        </motion.div>

        <h1 className="text-fade-display select-none text-[16.5vw] font-semibold leading-[0.84] tracking-[-0.045em] sm:text-[15vw] lg:text-[12.5vw]">
          <RevealLine delay={0.15}>
            <ScrambleText text="AVISHKAR" />
          </RevealLine>
          <RevealLine delay={0.28}>
            <ScrambleText text="KEDAR" />
          </RevealLine>
        </h1>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            className="max-w-md text-[15px] leading-relaxed text-fg/60 sm:text-base"
          >
            {PROFILE.headline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.85 }}
            className="flex flex-col items-start gap-6 sm:items-end"
          >
            <dl className="flex gap-10 font-mono sm:gap-12">
              {[
                { k: 'Shipped', v: String(projects.length).padStart(2, '0') },
                { k: 'Live', v: String(liveCount).padStart(2, '0') },
                { k: 'In build', v: String(buildingCount).padStart(2, '0') },
              ].map((s, i) => (
                <div key={s.k} className={`flex flex-col ${i > 0 ? 'border-l border-line pl-10 sm:pl-12' : ''}`}>
                  <dd className="-mt-1 text-2xl font-semibold tracking-tight text-fg sm:text-3xl">{s.v}</dd>
                  <dt className="mt-1 text-[10px] uppercase tracking-[0.25em] text-fg/40">{s.k}</dt>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
                <a
                  href="#projects"
                  data-cursor="Go"
                  className="group flex items-center gap-2.5 bg-fg px-6 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bg transition-colors duration-300 hover:bg-fg/85"
                >
                  Explore the index
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className="group flex items-center gap-2.5 border border-line px-6 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-fg/80 transition-all duration-300 hover:border-fg hover:text-fg"
                >
                  GitHub
                  <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="mx-auto flex w-full max-w-[1440px] items-end justify-between px-5 pb-6 pt-16 sm:px-8 sm:pb-8"
      >
        {!reduced && (
          <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/35">
            <span className="inline-block h-3 w-px animate-pulse bg-fg/50" />
            Drag anywhere to spin the sky
          </p>
        )}
        <div className="ml-auto flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-fg/30">Scroll</span>
          <span className="block h-10 w-px animate-scroll-line bg-fg/40" />
        </div>
      </motion.div>
    </section>
  )
}
