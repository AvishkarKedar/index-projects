import { useState } from 'react'
import { LayoutGroup } from 'framer-motion'
import { projects, Project } from '../data/projects'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import RevealText from './RevealText'

export default function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  return (
    <section id="projects" className="scroll-mt-24 border-b border-line px-6 py-16 sm:py-20 md:py-24">
      <LayoutGroup>
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 flex items-end justify-between">
            <h2 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
              <RevealText text="Projects" inView />
            </h2>
            <p className="hidden font-mono text-xs uppercase tracking-widest text-fg/40 sm:block">
              {projects.length} total — scroll to explore
            </p>
          </div>
          <div className="flex flex-col">
            {projects.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} onOpen={setActive} />
            ))}
          </div>
        </div>
        <ProjectModal project={active} onClose={() => setActive(null)} />
      </LayoutGroup>
    </section>
  )
}
