import { projects } from '../data/projects'

const allTags = Array.from(new Set(projects.flatMap((p) => p.tags)))
const loopTags = [...allTags, ...allTags]

export default function TechMarquee() {
  return (
    <div className="relative mt-16 overflow-hidden border-y border-line py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee gap-10">
        {loopTags.map((tag, i) => (
          <span key={`${tag}-${i}`} className="shrink-0 font-mono text-xs uppercase tracking-widest text-white/40">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
