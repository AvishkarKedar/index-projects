import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Project } from '../data/projects'
import StatusDot from './StatusDot'

export default function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl p-8 sm:p-10"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-line text-white/60 transition-colors hover:border-white hover:text-white"
            >
              ✕
            </button>
            <StatusDot status={project.status} />
            <h3 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{project.name}</h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-widest text-money">{project.tagline}</p>
            <p className="mt-6 text-base leading-relaxed text-white/70">
              {project.longDescription || project.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-money px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
                >
                  Visit ↗
                </a>
              )}
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-white/70 transition-colors hover:border-white hover:text-white"
              >
                Source ↗
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
