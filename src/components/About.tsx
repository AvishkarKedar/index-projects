import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import RevealText from './RevealText'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-line px-6 py-28">
      <div className="mx-auto max-w-6xl grid gap-12 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            <RevealText text="About" inView />
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl space-y-6 text-lg leading-relaxed text-white/70"
        >
          <p>
            I'm Avishkar — an engineer based in Pune, building small, sharp
            products end‑to‑end. My work spans real‑time encrypted web apps,
            offline‑first mobile tools, and the infrastructure that hosts them.
          </p>
          <p>
            Everything here is self‑hosted across{' '}
            <span className="text-white">avishkark.in</span> and its
            subdomains, deployed straight from GitHub.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-4">
            <div>
              <p className="font-mono text-3xl text-white">
                <AnimatedNumber value={5} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">Projects shipped</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-white">
                <AnimatedNumber value={1} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">Domain, many subdomains</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-white">
                <AnimatedNumber value={0} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">Backends where avoidable</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-white">∞</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/40">Side projects queued</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
