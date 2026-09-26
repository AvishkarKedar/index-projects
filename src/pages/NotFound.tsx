import TransitionLink from '../components/TransitionLink'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 pt-32 text-center">
      <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-fg/35">Error — signal lost</p>
      <h1 className="mt-3 font-serif text-[clamp(5rem,20vw,10rem)] leading-none tracking-serifdisplay text-fg">
        4<span className="italic text-fg/40">0</span>4
      </h1>
      <p className="mt-4 font-mono text-xs uppercase tracking-[0.25em] text-fg/50">This page doesn&apos;t exist.</p>
      <TransitionLink
        to="/"
        data-cursor="Go"
        className="mt-8 bg-fg px-7 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-bg transition-colors hover:bg-accent"
      >
        Back to the index
      </TransitionLink>
    </div>
  )
}
