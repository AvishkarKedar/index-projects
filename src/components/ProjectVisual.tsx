import { motion } from 'framer-motion'
import { Project } from '../data/projects'

const variants: Array<React.CSSProperties> = [
  { backgroundImage: 'radial-gradient(circle at 30% 30%, rgb(var(--fg-rgb) / 0.09), transparent 60%)' },
  {
    backgroundImage:
      'linear-gradient(rgb(var(--fg-rgb) / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--fg-rgb) / 0.07) 1px, transparent 1px)',
    backgroundSize: '20px 20px',
  },
  {
    backgroundImage:
      'repeating-linear-gradient(135deg, rgb(var(--fg-rgb) / 0.08) 0px, rgb(var(--fg-rgb) / 0.08) 1px, transparent 1px, transparent 14px)',
  },
  {
    backgroundImage:
      'repeating-radial-gradient(circle at 50% 50%, rgb(var(--fg-rgb) / 0.07) 0, rgb(var(--fg-rgb) / 0.07) 1px, transparent 1px, transparent 18px)',
  },
]

export default function ProjectVisual({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <div className="relative mb-6 h-40 w-full overflow-hidden border border-fg/12 sm:h-56">
        <img
          src={project.image}
          alt={`${project.name} preview`}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    )
  }

  const style = variants[index % variants.length]

  return (
    <div
      className="relative mb-6 h-40 w-full overflow-hidden border border-fg/12 sm:h-56"
      style={{ ...style, backgroundColor: 'rgb(var(--fg-rgb) / 0.03)' }}
    >
      <motion.div
        aria-hidden="true"
        animate={{ x: [0, 14, 0], y: [0, -12, 0] }}
        transition={{ duration: 9 + index, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-8 -top-8 h-32 w-32 rounded-full blur-2xl"
        style={{ backgroundColor: 'rgb(var(--accent-rgb) / 0.16)' }}
      />
      <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.25em] text-fg/30">
        {project.tags[0]}
      </span>
      <span
        aria-hidden
        className="absolute -bottom-4 right-3 select-none font-serif text-7xl italic leading-none text-fg/10"
      >
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}
