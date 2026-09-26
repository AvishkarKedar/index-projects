/**
 * Shared motion language. One easing curve, used everywhere, so the
 * whole site moves with the same personality — fast start, long
 * settle. Durations are deliberately short; choreography comes from
 * stagger, not from slow tweens.
 */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
export const EASE_INOUT: [number, number, number, number] = [0.83, 0, 0.17, 1]

export const SPRING = {
  magnetic: { stiffness: 180, damping: 16, mass: 0.5 },
  counter: { stiffness: 320, damping: 26, mass: 0.6 },
} as const
