import { useEffect, useRef } from 'react'

/**
 * Constellation — deterministic generative star-map art, one unique
 * constellation per project. Stars, connecting hairlines, and a slow
 * twinkle are all seeded from the project slug, so the art is stable
 * across renders and feels "mapped" rather than random.
 */

function mulberry32(seed: number) {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function hashSlug(slug: string) {
  let h = 2166136261
  for (let i = 0; i < slug.length; i++) {
    h ^= slug.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

type Star = { x: number; y: number; r: number; phase: number }

export default function Constellation({
  slug,
  className = '',
  animate = true,
  label,
}: {
  slug: string
  className?: string
  animate?: boolean
  label?: string
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const rand = mulberry32(hashSlug(slug))

    // Seeded star field
    const count = 8 + Math.floor(rand() * 4)
    const stars: Star[] = []
    for (let i = 0; i < count; i++) {
      stars.push({
        x: 0.08 + rand() * 0.84,
        y: 0.12 + rand() * 0.76,
        r: 0.8 + rand() * 1.8,
        phase: rand() * Math.PI * 2,
      })
    }
    // Chain-connect nearest neighbours for constellation lines
    const edges: [number, number][] = []
    const linked = new Set<number>([0])
    for (let n = 1; n < count; n++) {
      let best = -1
      let bestD = Infinity
      for (let j = 0; j < count; j++) {
        if (linked.has(j)) continue
        const a = stars[n - 1]
        const b = stars[j]
        const d = (a.x - b.x) ** 2 + (a.y - b.y) ** 2
        if (d < bestD) {
          bestD = d
          best = j
        }
      }
      if (best >= 0) {
        edges.push([n - 1, best])
        linked.add(best)
      }
    }
    // A couple of extra long edges for character
    if (count > 5) {
      edges.push([0, count - 1])
      edges.push([1, Math.floor(count / 2)])
    }

    let raf = 0
    let visible = !document.hidden

    const draw = (t: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      const w = Math.max(rect.width, 1)
      const h = Math.max(rect.height, 1)
      if (canvas.width !== Math.floor(w * dpr) || canvas.height !== Math.floor(h * dpr)) {
        canvas.width = Math.floor(w * dpr)
        canvas.height = Math.floor(h * dpr)
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.clearRect(0, 0, w, h)

      // Backdrop dust
      ctx.fillStyle = 'rgba(255,255,255,0.35)'
      for (let i = 0; i < 26; i++) {
        const dx = ((i * 73 + hashSlug(slug) % 50) % 100) / 100
        const dy = ((i * 131 + hashSlug(slug) % 80) % 100) / 100
        ctx.fillRect(dx * w, dy * h, 1, 1)
      }

      // Lines
      ctx.lineWidth = 0.6
      for (const [a, b] of edges) {
        ctx.strokeStyle = 'rgba(255,255,255,0.18)'
        ctx.beginPath()
        ctx.moveTo(stars[a].x * w, stars[a].y * h)
        ctx.lineTo(stars[b].x * w, stars[b].y * h)
        ctx.stroke()
      }

      // Stars with twinkle
      for (const s of stars) {
        const tw = reduced || !animate ? 0.8 : 0.55 + 0.45 * Math.sin(t * 0.0012 + s.phase)
        const px = s.x * w
        const py = s.y * h
        const rr = s.r * (w / 220)

        const glow = ctx.createRadialGradient(px, py, 0, px, py, rr * 5)
        glow.addColorStop(0, `rgba(255,255,255,${0.5 * tw})`)
        glow.addColorStop(1, 'rgba(255,255,255,0)')
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(px, py, rr * 5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,255,255,${0.55 + 0.45 * tw})`
        ctx.beginPath()
        ctx.arc(px, py, rr, 0, Math.PI * 2)
        ctx.fill()
      }

      if (animate && !reduced && visible) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    const onVis = () => {
      visible = !document.hidden
      if (visible) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    const ro = new ResizeObserver(() => {
      // Redraw immediately at new size
      cancelAnimationFrame(raf)
      draw(performance.now())
      if (animate && !reduced) raf = requestAnimationFrame(draw)
    })
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [slug, animate])

  return (
    <div className={`relative ${className}`} aria-hidden={label ? undefined : true}>
      <canvas ref={canvasRef} className="block h-full w-full" />
      {label && (
        <span className="pointer-events-none absolute bottom-2 right-3 text-right font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
          {label}
        </span>
      )}
    </div>
  )
}
