import { useEffect } from 'react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { Project } from '../data/projects'
import StatusDot from './StatusDot'

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
}

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
            layoutId={`card-${project.name}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
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

            <motion.div variants={container} initial="hidden" animate="show">
              <motion.div variants={item}>
                <StatusDot status={project.status} />
                <motion.h3
                  layoutId={`title-${project.name}`}
                  className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
                >
                  {project.name}
                </motion.h3>
                <p className="mt-1 font-mono text-xs uppercase tracking-widest text-white/70">{project.tagline}</p>
              </motion.div>

              <motion.div variants={item} className="mt-7 max-w-prose">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">Overview</p>
                <p className="mt-2 text-base leading-relaxed text-white/70">{project.details.overview}</p>
              </motion.div>

              <motion.div variants={item} className="mt-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">Key Features</p>
                <ul className="mt-3 space-y-2">
                  {project.details.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm leading-relaxed text-white/70">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/50" />
                      {f}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div variants={item} className="mt-7 max-w-prose">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">Architecture</p>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{project.details.architecture}</p>
              </motion.div>

              {project.details.highlights && project.details.highlights.length > 0 && (
                <motion.div variants={item} className="mt-7">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">Highlights</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.details.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-full border border-white/20 bg-white/[0.04] px-3 py-1 text-xs text-white/70"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}

              <motion.div variants={item} className="mt-7">
                <p className="font-mono text-[11px] uppercase tracking-widest text-white/40">Tech Stack</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-white/50"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
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
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
