import { RefObject } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import { Project } from '../data/projects'

function RailItem({
  index,
  count,
  progress,
  name,
}: {
  index: number
  count: number
  progress: MotionValue<number>
  name: string
}) {
  const center = count <= 1 ? 0 : index / (count - 1)
  const step = count <= 1 ? 1 : 1 / (count - 1)
  const distance = useTransform(progress, (p) => Math.min(Math.abs(p - center) / step, 1))
  const opacity = useTransform(distance, [0, 1], [1, 0.28])
  const scale = useTransform(distance, [0, 1], [1, 0.55])

  return (
    <motion.div style={{ opacity }} className="flex items-center gap-3">
      <motion.span style={{ scale }} className="block h-1.5 w-1.5 shrink-0 rounded-full bg-fg" />
      <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-fg/50">{name}</span>
    </motion.div>
  )
}

export default function ProjectsRail({
  containerRef,
  projects,
}: {
  containerRef: RefObject<HTMLDivElement>
  projects: Project[]
}) {
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start center', 'end center'] })

  return (
    <div className="sticky top-1/2 flex -translate-y-1/2 flex-col gap-7">
      {projects.map((p, i) => (
        <RailItem key={p.slug} index={i} count={projects.length} progress={scrollYProgress} name={p.name} />
      ))}
    </div>
  )
}
