import { motion } from 'framer-motion'
import RevealText from './RevealText'
import Magnetic from './Magnetic'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen min-h-[100svh] min-h-[100dvh] flex-col justify-center overflow-hidden border-b border-line px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] animate-blob rounded-full bg-white/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[26rem] w-[26rem] animate-blob rounded-full bg-white/8 blur-[120px] [animation-delay:4s]" />
        <div className="bg-grid bg-grid-fade absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-white" />
          Pune, India — open to new projects
        </motion.p>

        <h1 className="shine-sweep overflow-hidden text-[clamp(2.75rem,13vw,8.5rem)] font-semibold leading-[0.9] tracking-tightest text-white">
          <RevealText text="Avishkar" by="char" />
          <br />
          <span className="text-white/30">
            <RevealText text="Kedar." by="char" delay={0.45} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-8 max-w-xl text-lg text-white/60 sm:text-xl"
        >
          Software engineer building end‑to‑end — encrypted real‑time web apps,
          offline‑first mobile tools, and everything hosted at{' '}
          <a href="https://avishkark.in" data-cursor="Visit" className="text-white underline decoration-white/50 underline-offset-4 hover:decoration-white">
            avishkark.in
          </a>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              data-cursor="View"
              className="rounded-full bg-white px-7 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
            >
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              data-cursor="Go"
              className="rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:border-white hover:text-white"
            >
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-20 grid grid-cols-2 gap-8 border-t border-line pt-8 sm:grid-cols-4"
        >
          {[
            ['5', 'projects live'],
            ['1', 'domain, many subdomains'],
            ['0', 'backends where avoidable'],
            ['24/7', 'uptime target'],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-mono text-2xl text-white sm:text-3xl">{n}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">{l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/30"
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
