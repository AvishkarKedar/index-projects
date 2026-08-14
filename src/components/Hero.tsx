import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-line px-6">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0" />
      <div className="relative mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 font-mono text-xs uppercase tracking-[0.3em] text-white/50"
        >
          Index — 001 / Pune, India
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="text-[13vw] font-semibold leading-[0.9] tracking-tightest text-white sm:text-[8vw] lg:text-[6.5vw]"
        >
          Avishkar
          <br />
          <span className="text-white/30">Kedar.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="mt-8 max-w-xl text-lg text-white/60 sm:text-xl"
        >
          Software engineer building end‑to‑end — encrypted real‑time web apps,
          offline‑first mobile tools, and everything hosted at{' '}
          <a href="https://avishkark.in" className="text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            avishkark.in
          </a>
          .
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap gap-4"
        >
          <a href="#projects" className="border border-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-black">
            View Projects
          </a>
          <a href="#contact" className="border border-line px-6 py-3 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:border-white hover:text-white">
            Get in Touch
          </a>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-widest text-white/30"
      >
        Scroll ↓
      </motion.div>
    </section>
  )
}
