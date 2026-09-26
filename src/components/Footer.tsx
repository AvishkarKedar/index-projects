import { PROFILE } from '../data/projects'
import { GitHubIcon, InstagramIcon, XIcon } from './Icons'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="px-6 pb-16 pt-4 sm:px-10">
      <div className="mx-auto w-full max-w-wrap">
        <div className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span>Designed &amp; built by</span>
            <Link to="/" className="text-accent underline-offset-4 hover:underline">
              {PROFILE.name}
            </Link>
          </div>

          <div className="flex items-center gap-6 text-muted">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="transition-all duration-300 hover:-translate-y-1 hover:text-accent"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>
            <a
              href={PROFILE.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-all duration-300 hover:-translate-y-1 hover:text-accent"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={PROFILE.x}
              target="_blank"
              rel="noreferrer"
              aria-label="X"
              className="transition-all duration-300 hover:-translate-y-1 hover:text-accent"
            >
              <XIcon className="h-5 w-5" />
            </a>
          </div>

          <p className="font-mono text-[11px] text-muted/70">
            © {new Date().getFullYear()} {PROFILE.fullName} · No cookies · No trackers
          </p>
        </div>
      </div>
    </footer>
  )
}
