import { motion } from 'framer-motion'
import AnimatedNumber from './AnimatedNumber'
import RevealText from './RevealText'
import TechMarquee from './TechMarquee'

export default function About() {
  return (
    <section id="about" className="scroll-mt-24 border-b border-line px-6 py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-6xl grid gap-10 md:grid-cols-[1fr_2fr]">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
            <RevealText text="About" inView />
          </h2>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-prose space-y-6 text-lg leading-relaxed text-fg/80"
        >
          <p>
            I'm Avishkar — an engineer based in Pune, building small, sharp
            products end‑to‑end. My work spans real‑time encrypted web apps,
            offline‑first mobile tools, and the infrastructure that hosts them.
          </p>
          <p>
            Everything here is self‑hosted across{' '}
            <span className="text-fg">avishkark.in</span> and its
            subdomains, deployed straight from GitHub.
          </p>
          <div className="grid grid-cols-2 gap-6 pt-6 sm:grid-cols-4">
            <div>
              <p className="font-mono text-3xl text-fg">
                <AnimatedNumber value={5} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">Projects shipped</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-fg">
                <AnimatedNumber value={1} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">Domain, many subdomains</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-fg">
                <AnimatedNumber value={0} />
              </p>
              <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">Backends where avoidable</p>
            </div>
            <div>
              <p className="font-mono text-3xl text-fg">∞</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-fg/40">Side projects queued</p>
            </div>
          </div>
        </motion.div>
      </div>
      <TechMarquee />
    </section>
  )
}
