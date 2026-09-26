import { projects } from '../data/projects'

export default function Ticker() {
  const items = projects.flatMap((p) => [p.name.toUpperCase(), p.tagline])
  const row = [...items, ...items] // duplicated for seamless -50% loop

  return (
    <div
      className="marquee-mask relative overflow-hidden border-y border-line bg-black/40 py-4 backdrop-blur-[2px]"
      aria-hidden="true"
    >
      <div className="animate-marquee flex w-max items-center whitespace-nowrap">
        {row.map((text, i) => (
          <span key={i} className="flex items-baseline">
            <span
              className={
                i % 2 === 0
                  ? 'px-7 font-mono text-[11px] uppercase tracking-[0.3em] text-fg/70'
                  : 'px-7 font-serif text-xl italic tracking-serifdisplay text-outline'
              }
            >
              {text}
            </span>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-accent/60" />
          </span>
        ))}
      </div>
      {/* Edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black to-transparent" />
    </div>
  )
}
