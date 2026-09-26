import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-6 pt-24 text-center">
      <p className="font-mono text-sm text-accent">404 — page not found</p>
      <h1 className="mt-4 text-5xl font-bold tracking-tight text-fg sm:text-7xl">
        Nothing lives here.
      </h1>
      <p className="mt-4 max-w-md text-muted">
        The page you&apos;re looking for was never shipped — or it moved. Head back to the index.
      </p>
      <Link
        to="/"
        className="mt-9 inline-flex items-center gap-2.5 rounded border border-accent px-6 py-3.5 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent/10"
      >
        Back to the index
      </Link>
    </div>
  )
}
