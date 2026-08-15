import { useRef, useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { projects, Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import ProjectsRail from './ProjectsRail'
import RevealText from './RevealText'

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="projects"
      className="relative scroll-mt-24 overflow-hidden border-b border-line px-6 py-16 sm:py-20 md:py-24"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 animate-blob rounded-full blur-[140px] [animation-delay:7s]"
          style={{ backgroundColor: 'rgb(var(--accent-rgb) / var(--blob-o2))' }}
        />
      </div>
      <LayoutGroup>
        <div className="relative mx-auto max-w-3xl">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              <RevealText text="Projects" inView />
            </h2>
            <p className="hidden font-mono text-xs uppercase tracking-widest text-fg/40 sm:block">
              {projects.length} total — scroll to explore
            </p>
          </div>
          <div ref={containerRef} className="relative flex flex-col">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} onOpen={setActive} />
            ))}
            <div className="pointer-events-none absolute left-full top-0 hidden h-full pl-10 xl:block">
              <ProjectsRail containerRef={containerRef} projects={projects} />
            </div>
          </div>
        </div>
        <ProjectModal project={active} onClose={() => setActive(null)} />
      </LayoutGroup>
    </section>
  )
}
