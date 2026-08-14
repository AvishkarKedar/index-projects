import { motion } from 'framer-motion'

export default function RevealText({
  text,
  className = '',
  delay = 0,
  inView = false,
  by = 'word',
}: {
  text: string
  className?: string
  delay?: number
  inView?: boolean
  by?: 'word' | 'char'
}) {
  const units = by === 'char' ? text.split('') : text.split(' ')
  const stagger = by === 'char' ? 0.03 : 0.06

  return (
    <span className={className}>
      {units.map((unit, i) => (
        <span
          key={i}
          className={
            by === 'char'
              ? 'inline-block overflow-hidden pb-1 align-bottom'
              : 'inline-block overflow-hidden pb-1 pr-[0.25em] align-bottom'
          }
        >
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: '115%', opacity: 0, rotateZ: 8, filter: 'blur(10px)' }}
            {...(inView
              ? {
                  whileInView: { y: 0, opacity: 1, rotateZ: 0, filter: 'blur(0px)' },
                  viewport: { once: true, margin: '-100px' },
                }
              : { animate: { y: 0, opacity: 1, rotateZ: 0, filter: 'blur(0px)' } })}
            transition={{ duration: 0.85, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
          >
            {unit === ' ' ? '\u00A0' : unit}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
