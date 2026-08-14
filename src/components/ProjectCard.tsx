import { motion } from 'framer-motion'
import { Project } from '../data/projects'
import StatusDot from './StatusDot'

export default function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project
  index: number
  onOpen: (project: Project) => void
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onOpen(project)}
      className="glass glow-border group relative cursor-pointer rounded-2xl p-8"
    >
      <div className="mb-6 flex items-start justify-between">
        <span className="font-mono text-xs text-white/30">{String(index + 1).padStart(2, '0')}</span>
        <StatusDot status={project.status} />
      </div>
      <h3 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">{project.name}</h3>
      <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white/70">{project.tagline}</p>
      <p className="mt-5 text-sm leading-relaxed text-white/60">{project.description}</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-8 flex gap-6 font-mono text-xs uppercase tracking-widest">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
          >
            Visit ↗
          </a>
        )}
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="text-white/50 underline decoration-white/10 underline-offset-4 hover:text-white hover:decoration-white/30"
        >
          Source ↗
        </a>
        <span className="ml-auto text-white/30 opacity-0 transition-opacity group-hover:opacity-100">Details →</span>
      </div>
    </motion.article>
  )
}
