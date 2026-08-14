export default function Footer() {
  return (
    <footer className="border-t border-line px-6 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-widest text-white/30 sm:flex-row">
        <p className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-money" />
          © {new Date().getFullYear()} Avishkar Kedar
        </p>
        <p>Built with React · Tailwind · Framer Motion</p>
      </div>
    </footer>
  )
}
