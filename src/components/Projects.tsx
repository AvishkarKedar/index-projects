import { projects } from '../data/projects'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="border-b border-line px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/40">Index — 002</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">Projects</h2>
          </div>
          <p className="hidden font-mono text-xs uppercase tracking-widest text-white/40 sm:block">
            {projects.length} total
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
