import { ProjectStatus } from '../data/projects'

const statusMap: Record<ProjectStatus, { color: string; label: string; pulse: boolean }> = {
  live: { color: 'bg-white', label: 'Live', pulse: true },
  'in-progress': { color: 'bg-white/50', label: 'In Progress', pulse: false },
  maintenance: { color: 'bg-white/25', label: 'Maintenance', pulse: false },
}

export default function StatusDot({ status }: { status: ProjectStatus }) {
  const s = statusMap[status]
  return (
    <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-white/60">
      <span className={`h-1.5 w-1.5 rounded-full ${s.color} ${s.pulse ? 'animate-pulse-dot' : ''}`} />
      {s.label}
    </span>
  )
}
