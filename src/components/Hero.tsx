import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROFILE, projects } from '../data/projects'
import { EASE } from '../lib/motion'
import Magnetic from './Magnetic'
import { MaskLine, FadeUp } from './Reveal'

const liveCount = projects.filter((p) => p.status === 'live').length
const buildingCount = projects.filter((p) => p.status !== 'live').length

export default function Hero() {
  // First session visit rides out under the intro overlay; later
  // navigations start immediately.
  const [afterIntro] = useState(() => !!sessionStorage.getItem('intro-shown'))
  const base = afterIntro ? 0.15 : 2.0

  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden">
      <div className="h-24" />

      {/* rotated edge strip */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: base + 1.2 }}
        aria-hidden
        className="pointer-events-none absolute right-6 top-1/2 hidden origin-center -translate-y-1/2 rotate-90 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.4em] text-fg/25 lg:block"
      >
        avishkark.in — all systems open — {new Date().getFullYear()}
      </motion.p>

      <div className="mx-auto w-full max-w-[1440px] px-5 pt-10 sm:px-8 lg:pt-14">
        {/* meta row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: base }}
          className="mb-8 flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.3em] text-fg/50 sm:mb-12 sm:text-[10.5px]"
        >
          <span className="flex items-center gap-2.5">
            <span className="h-[5px] w-[5px] rounded-full bg-accent" />
            Portfolio — {new Date().getFullYear()}
          </span>
          <span aria-hidden className="hidden h-px w-9 bg-fg/20 sm:inline-block" />
          <span className="hidden sm:inline">{PROFILE.name}</span>
          <span aria-hidden className="hidden h-px w-9 bg-fg/20 sm:inline-block" />
          <span className="text-fg/35">Privacy-first · Offline-capable</span>
        </motion.div>

        {/* editorial display headline */}
        <h1 className="select-none font-serif text-[clamp(3.6rem,11.5vw,10.5rem)] leading-[0.94] tracking-serifdisplay text-fg">
          <MaskLine delay={base + 0.1}>
            Building quietly,
          </MaskLine>
          <MaskLine delay={base + 0.24}>
            shipping <em className="italic text-fg/45">loudly.</em>
          </MaskLine>
        </h1>

        <div className="mt-10 flex flex-col gap-10 sm:mt-14 lg:flex-row lg:items-end lg:justify-between">
          <FadeUp delay={base + 0.55} className="max-w-md">
            <p className="text-[15px] leading-relaxed text-fg/60 sm:text-base">{PROFILE.headline}</p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/35">
              {PROFILE.fullName} — {PROFILE.role}
            </p>
          </FadeUp>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: base + 0.7 }}
            className="flex flex-col items-start gap-7 sm:items-end"
          >
            <dl className="flex gap-9 font-mono sm:gap-11">
              {[
                { k: 'Shipped', v: projects.length },
                { k: 'Live', v: liveCount },
                { k: 'In build', v: buildingCount },
              ].map((s, i) => (
                <div key={s.k} className={`flex flex-col ${i > 0 ? 'border-l border-line pl-9 sm:pl-11' : ''}`}>
                  <dd className="-mt-1 text-3xl font-medium tracking-tight text-fg">
                    {String(s.v).padStart(2, '0')}
                  </dd>
                  <dt className="mt-1.5 text-[9.5px] uppercase tracking-[0.28em] text-fg/40">{s.k}</dt>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.25}>
                <a
                  href="#projects"
                  data-cursor="Go"
                  className="group relative flex items-center gap-2.5 overflow-hidden bg-fg px-6 py-3.5 font-mono text-[10.5px] font-medium uppercase tracking-[0.22em] text-bg"
                >
                  <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-500 ease-out-expo group-hover:translate-x-0" />
                  <span className="relative">Explore the index</span>
                  <span aria-hidden className="relative inline-block transition-transform duration-500 ease-out-expo group-hover:translate-y-0.5">↓</span>
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="Open"
                  className="group flex items-center gap-2.5 border border-fg/20 px-6 py-3.5 font-mono text-[10.5px] uppercase tracking-[0.22em] text-fg/80 transition-colors duration-300 hover:border-fg hover:text-fg"
                >
                  GitHub
                  <span aria-hidden className="inline-block transition-transform duration-500 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </a>
              </Magnetic>
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: base + 1.3 }}
        className="mx-auto flex w-full max-w-[1440px] items-end justify-between px-5 pb-6 pt-16 sm:px-8 sm:pb-8"
      >
        <p className="flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.28em] text-fg/35">
          <span className="inline-block h-3 w-px animate-pulse-soft bg-accent" />
          Drag anywhere to orbit the core
        </p>
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-fg/30">Scroll</span>
          <span className="block h-10 w-px animate-scroll-line bg-fg/40" />
        </div>
      </motion.div>
    </section>
  )
}
