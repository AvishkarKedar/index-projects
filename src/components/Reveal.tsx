import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/** Generic fade-and-rise for in-view content — the site's only reveal. */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  y = 18,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration, ease: EASE, delay }}
      className={`will-fade ${className}`}
    >
      {children}
    </motion.div>
  )
}

/** Numbered section heading: "01. About ———————" */
export function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <FadeUp>
      <h2 className="flex items-center gap-4 whitespace-nowrap text-2xl font-bold tracking-tight text-fg sm:text-3xl">
        <span className="font-mono text-base font-normal text-accent sm:text-lg">{index}.</span>
        {title}
        <span aria-hidden className="mt-1 hidden h-px w-full max-w-[280px] bg-fg/15 sm:block" />
      </h2>
    </FadeUp>
  )
}
