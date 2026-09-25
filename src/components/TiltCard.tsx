import { useRef, useState, type ReactNode, type CSSProperties } from 'react'

/**
 * 3D perspective tilt card — reacts to pointer position with
 * rotateX/rotateY, a moving glare highlight, and a soft lift.
 */
export default function TiltCard({
  children,
  className = '',
  maxTilt = 6,
  glare = true,
  style,
}: {
  children: ReactNode
  className?: string
  maxTilt?: number
  glare?: boolean
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState<string>('')
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (0.5 - py) * maxTilt * 2
    const ry = (px - 0.5) * maxTilt * 2
    setTransform(`perspective(900px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(0)`)
    setGlarePos({ x: px * 100, y: py * 100, opacity: 1 })
  }

  const handleLeave = () => {
    setTransform('')
    setGlarePos((g) => ({ ...g, opacity: 0 }))
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transform: transform || 'perspective(900px) rotateX(0deg) rotateY(0deg)', ...style }}
    >
      {children}
      {glare && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity * 0.6,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.09), transparent 55%)`,
          }}
        />
      )}
    </div>
  )
}
