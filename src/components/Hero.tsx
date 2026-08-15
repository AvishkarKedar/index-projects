import { motion } from 'framer-motion'
import RevealText from './RevealText'
import Magnetic from './Magnetic'
import TypingText from './TypingText'
import AnimatedNumber from './AnimatedNumber'

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen min-h-[100svh] min-h-[100dvh] flex-col justify-center overflow-hidden border-b border-line px-6"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 h-[32rem] w-[32rem] animate-blob rounded-full bg-fg/15 blur-[120px]" />
        <div className="absolute right-1/4 top-1/3 h-[26rem] w-[26rem] animate-blob rounded-full bg-fg/[0.08] blur-[120px] [animation-delay:4s]" />
        <div className="bg-grid bg-grid-fade absolute inset-0" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.3em] text-fg/50"
        >
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-fg" />
          <TypingText text="Pune, India — open to new projects" speed={26} startDelay={300} />
        </motion.p>

        <h1 className="shine-sweep overflow-hidden text-[clamp(2.75rem,13vw,8.5rem)] font-semibold leading-[0.9] tracking-tightest text-fg">
          <RevealText text="Avishkar" by="char" />
          <br />
          <span className="text-fg/30">
            <RevealText text="Kedar." by="char" delay={0.45} />
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="mt-6 max-w-prose text-lg text-fg/70 sm:text-xl"
        >
          Software engineer building end‑to‑end — encrypted real‑time web apps,
          offline‑first mobile tools, and everything hosted at{' '}
          <a href="https://avishkark.in" data-cursor="Visit" className="underline-grow font-medium text-fg">
            avishkark.in
          </a>
          .
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Magnetic>
            <a
              href="#projects"
              data-cursor="View"
              className="rounded-full bg-fg px-7 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-bg transition-transform hover:scale-105"
            >
              View Projects
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              data-cursor="Go"
              className="rounded-full border border-line px-7 py-3 font-mono text-xs uppercase tracking-widest text-fg/70 transition-colors hover:border-fg hover:text-fg"
            >
              Get in Touch
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-14 grid grid-cols-2 gap-8 border-t border-line pt-6 sm:grid-cols-4"
        >
          <div>
            <p className="font-mono text-2xl text-fg sm:text-3xl">
              <AnimatedNumber value={5} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">projects live</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-fg sm:text-3xl">
              <AnimatedNumber value={1} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">domain, many subdomains</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-fg sm:text-3xl">
              <AnimatedNumber value={0} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">backends where avoidable</p>
          </div>
          <div>
            <p className="font-mono text-2xl text-fg sm:text-3xl">24/7</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">uptime target</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-fg/30"
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
