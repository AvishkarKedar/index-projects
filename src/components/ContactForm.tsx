import { FormEvent, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SuccessCheck from './SuccessCheck'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzNS7jOMwemv_ADv6DrFEWY_nlBFQ8SbsWYqL14zmsDjW3rD7giWdWfJK30kIIqSz5eXQ/exec'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [company, setCompany] = useState('') // honeypot: real users never see or fill this
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')
    setError('')
    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        // text/plain avoids a CORS preflight, which Apps Script can't handle.
        // The backend still JSON.parses the body itself.
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, email, subject, message, company, page: window.location.href }),
      })
      const result = await res.json()
      if (result.ok) {
        setStatus('sent')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus('error')
        setError(result.error || 'Something went wrong. Try again in a moment.')
      }
    } catch {
      setStatus('error')
      setError('Could not reach the server. Check your connection and try again.')
    }
  }

  function handleClose() {
    onClose()
    if (status === 'sent' || status === 'error') {
      setTimeout(() => setStatus('idle'), 300)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-end justify-center bg-bg/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Contact form"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.99 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="modal-scroll relative max-h-[92svh] w-full max-w-md overflow-y-auto border border-line bg-bg p-8 shadow-[0_0_120px_rgba(255,255,255,0.07)] sm:max-h-[90vh]"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="group absolute right-5 top-5 flex h-9 w-9 items-center justify-center border border-line text-fg/60 transition-all duration-300 hover:rotate-90 hover:border-fg hover:text-fg"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="py-10 text-center"
              >
                <SuccessCheck />
                <p className="mt-5 text-2xl font-semibold tracking-tight text-fg">Message sent.</p>
                <p className="mt-2 text-sm text-fg/55">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                <button
                  onClick={handleClose}
                  className="mt-7 bg-fg px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-bg transition-colors hover:bg-fg/85"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-fg/35">Contact</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-fg">Write to me</h3>
                  <p className="mt-1.5 text-sm text-fg/50">
                    Goes straight to my inbox — I usually reply within 24–48 hours.
                  </p>
                </div>

                {/* Honeypot field: hidden from real users, bots often fill every field */}
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                />

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
                  <label htmlFor="cf-name" className="block font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40">
                    Name
                  </label>
                  <input
                    id="cf-name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full border border-line bg-fg/[0.04] px-4 py-2.5 text-sm text-fg outline-none transition-colors focus:border-fg"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <label htmlFor="cf-email" className="block font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40">
                    Email
                  </label>
                  <input
                    id="cf-email"
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full border border-line bg-fg/[0.04] px-4 py-2.5 text-sm text-fg outline-none transition-colors focus:border-fg"
                    placeholder="you@example.com"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <label htmlFor="cf-subject" className="block font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40">
                    Subject <span className="normal-case text-fg/25">(optional)</span>
                  </label>
                  <input
                    id="cf-subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2 w-full border border-line bg-fg/[0.04] px-4 py-2.5 text-sm text-fg outline-none transition-colors focus:border-fg"
                    placeholder="What's this about?"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <label htmlFor="cf-message" className="block font-mono text-[10px] uppercase tracking-[0.25em] text-fg/40">
                    Message
                  </label>
                  <textarea
                    id="cf-message"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full resize-none border border-line bg-fg/[0.04] px-4 py-2.5 text-sm text-fg outline-none transition-colors focus:border-fg"
                    placeholder="What's on your mind?"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.98 }}
                  className="w-full bg-fg px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-bg transition-colors hover:bg-fg/85 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </motion.button>
                {status === 'error' && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                    transition={{ duration: 0.4 }}
                    className="text-center text-xs text-rose-500"
                  >
                    {error}
                  </motion.p>
                )}
                <p className="text-center text-[11px] text-fg/25">
                  Your details are only used to reply to you — never shared or sold.
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
