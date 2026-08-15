import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.4, 1, 0.4])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.94])

  return (
    <div
      ref={ref}
      className="flex min-h-[70vh] items-center py-8 sm:min-h-[85vh]"
      style={{ scrollSnapAlign: 'center' }}
    >
      <motion.article
        style={{ opacity, scale }}
        layoutId={`card-${project.name}`}
        whileHover={{ y: -6 }}
        transition={{ ease: [0.16, 1, 0.3, 1] }}
        onClick={() => onOpen(project)}
        data-cursor="Open"
        className="glass glow-border group relative w-full cursor-pointer overflow-hidden rounded-2xl p-8 sm:p-10"
      >
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            <StatusDot status={project.status} />
            <span className="font-mono text-[10px] uppercase tracking-widest text-fg/30">
              {String(index + 1).padStart(2, '0')} / {String(5).padStart(2, '0')}
            </span>
          </div>
          <ProjectVisual project={project} index={index} />
          <motion.h3 layoutId={`title-${project.name}`} className="text-2xl font-semibold tracking-tight text-fg sm:text-3xl">
            <ScrambleText text={project.name} />
          </motion.h3>
          <p className="mt-1 font-mono text-xs uppercase tracking-widest text-fg/70">{project.tagline}</p>
          <p className="mt-5 text-sm leading-relaxed text-fg/70">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-fg/50">
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
                className="underline-grow inline-flex items-center py-2 text-fg"
              >
                Visit ↗
              </a>
            )}
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="underline-grow inline-flex items-center py-2 text-fg/60 hover:text-fg"
            >
              Source ↗
            </a>
            <span className="ml-auto text-fg/30 opacity-0 transition-opacity group-hover:opacity-100">Details →</span>
          </div>
        </div>
      </motion.article>
    </div>
  )
}
