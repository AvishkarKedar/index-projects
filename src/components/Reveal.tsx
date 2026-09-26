import { motion } from 'framer-motion'
import { EASE } from '../lib/motion'

/** Line clipped inside an overflow mask, sliding up into place. */
export function MaskLine({
  children,
  delay = 0,
  duration = 1.05,
  className = '',
}: {
  children: React.ReactNode
  delay?: number
  duration?: number
  className?: string
}) {
  return (
    <span className={`block overflow-hidden pb-[0.1em] ${className}`}>
      <motion.span
        className="block will-change-transform"
        initial={{ y: '112%' }}
        animate={{ y: 0 }}
        transition={{ duration, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

/** Generic fade-and-rise for in-view content. */
export function FadeUp({
  children,
  delay = 0,
  duration = 0.85,
  y = 22,
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
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/** Section eyebrow: index number, hairline, label. */
export function SectionMark({ index, label }: { index: string; label: string }) {
  return (
    <FadeUp>
      <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.32em] text-fg/45">
        <span className="text-accent">{index}</span>
        <span aria-hidden className="h-px w-10 bg-fg/25" />
        {label}
      </p>
    </FadeUp>
  )
}
