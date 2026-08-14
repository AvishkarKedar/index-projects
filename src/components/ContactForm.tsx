import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzNS7jOMwemv_ADv6DrFEWY_nlBFQ8SbsWYqL14zmsDjW3rD7giWdWfJK30kIIqSz5eXQ/exec'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ open, onClose }: { open: boolean; onClose: () => void }) {
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
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass relative w-full max-w-md rounded-2xl p-8"
          >
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-6 top-6 flex h-8 w-8 items-center justify-center rounded-full border border-line text-white/60 transition-colors hover:border-white hover:text-white"
            >
              ✕
            </button>

            {status === 'sent' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="py-8 text-center"
              >
                <p className="text-2xl font-semibold text-white">Message sent.</p>
                <p className="mt-2 text-sm text-white/60">Thanks for reaching out — I'll get back to you soon.</p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
                >
                  Close
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">Contact Me</h3>
                  <p className="mt-1 text-sm text-white/50">Goes straight to my inbox.</p>
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
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="Your name"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="you@example.com"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">
                    Subject <span className="normal-case text-white/25">(optional)</span>
                  </label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="What's this about?"
                  />
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full resize-none rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="What's on your mind?"
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  disabled={status === 'sending'}
                  whileHover={{ scale: status === 'sending' ? 1 : 1.03 }}
                  whileTap={{ scale: status === 'sending' ? 1 : 0.97 }}
                  className="w-full rounded-full bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-black disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </motion.button>
                {status === 'error' && <p className="text-center text-xs text-red-400">{error}</p>}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
