import TransitionLink from '../components/TransitionLink'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <h1 className="text-[clamp(4rem,18vw,8rem)] font-semibold leading-none tracking-tightest text-fg">404</h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-fg/50">This page doesn't exist.</p>
      <TransitionLink
        to="/"
        data-cursor="Go"
        className="mt-8 rounded-full bg-fg px-7 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-bg transition-transform hover:scale-105"
      >
        Back to avishkark.in
      </TransitionLink>
    </div>
  )
}
