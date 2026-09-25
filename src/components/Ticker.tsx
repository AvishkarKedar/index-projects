import { projects } from '../data/projects'

export default function Ticker() {
  const items = projects.flatMap((p) => [
    p.name.toUpperCase(),
    p.tagline.toUpperCase(),
  ])
  const row = [...items, ...items] // duplicated for seamless -50% loop

  return (
    <div
      className="marquee-mask relative overflow-hidden border-y border-white/[0.07] bg-black/40 py-4 backdrop-blur-[2px]"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {row.map((text, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`px-6 font-mono text-[11px] uppercase tracking-[0.3em] ${
                i % 2 === 0 ? 'text-white/75' : 'text-white/30'
              }`}
            >
              {text}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/25" />
          </span>
        ))}
      </div>
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
