import { AnchorHTMLAttributes, MouseEvent, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { flushSync } from 'react-dom'

type TransitionLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  to: string
  children: ReactNode
}

type DocumentWithViewTransitions = Document & {
  startViewTransition?: (callback: () => void) => void
}

export default function TransitionLink({ to, children, onClick, ...rest }: TransitionLinkProps) {
  const navigate = useNavigate()

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e)
    if (e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const doc = typeof document !== 'undefined' ? (document as DocumentWithViewTransitions) : undefined

    if (doc?.startViewTransition && !prefersReducedMotion) {
      doc.startViewTransition(() => {
        flushSync(() => navigate(to))
      })
    } else {
      navigate(to)
    }
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}
