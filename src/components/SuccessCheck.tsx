import { motion } from 'framer-motion'

const particles = Array.from({ length: 10 })

export default function SuccessCheck() {
  return (
    <div className="relative mx-auto flex h-20 w-20 items-center justify-center text-fg">
      {particles.map((_, i) => {
        const angle = (i / particles.length) * Math.PI * 2
        return (
          <motion.span
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{ x: Math.cos(angle) * 46, y: Math.sin(angle) * 46, opacity: 0, scale: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute h-1.5 w-1.5 rounded-full bg-fg"
          />
        )
      })}
      <motion.svg viewBox="0 0 52 52" className="relative h-16 w-16" initial="hidden" animate="visible">
        <motion.circle
          cx="26"
          cy="26"
          r="24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          variants={{ hidden: { pathLength: 0, opacity: 0.4 }, visible: { pathLength: 1, opacity: 1 } }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M14 27l7 7 17-17"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={{ hidden: { pathLength: 0 }, visible: { pathLength: 1 } }}
          transition={{ duration: 0.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.svg>
    </div>
  )
}
