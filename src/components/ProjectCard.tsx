import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { Project } from '../data/projects'
import StatusDot from './StatusDot'
import ProjectVisual from './ProjectVisual'
import ScrambleText from './ScrambleText'

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) {
  const shouldReduceMotion = useReducedMotion()
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  const ref = useRef<HTMLElement>(null)

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = e.clientX - rect.left
    const py = e.clientY - rect.top
    mouseX.set(px)
    mouseY.set(py)
    if (shouldReduceMotion) return
    rotateY.set((px / rect.width - 0.5) * 10)
    rotateX.set((py / rect.height - 0.5) * -10)
  }

  function handleMouseLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 70%)`

  return (
    <motion.article
      ref={ref}
      layoutId={`card-${project.name}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpen(project)}
      data-cursor="Open"
      style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 1000 }}
      className="glass glow-border rotating-border group relative cursor-pointer overflow-hidden rounded-2xl p-8"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="relative z-10">
        <div className="mb-4 flex justify-end">
          <StatusDot status={project.status} />
        </div>
        <ProjectVisual project={project} index={index} />
        <motion.h3 layoutId={`title-${project.name}`} className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          <ScrambleText text={project.name} />
        </motion.h3>
        <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white/70">{project.tagline}</p>
        <p className="mt-5 text-sm leading-relaxed text-white/70">{project.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-6 font-mono text-xs uppercase tracking-widest">
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="underline-grow inline-flex items-center py-2 text-white"
            >
              Visit ↗
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="underline-grow inline-flex items-center py-2 text-white/60 hover:text-white"
          >
            Source ↗
          </a>
          <span className="ml-auto text-white/30 opacity-0 transition-opacity group-hover:opacity-100">Details →</span>
        </div>
      </div>
    </motion.article>
  )
}
