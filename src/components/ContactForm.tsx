import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// After deploying the Apps Script web app (see setup instructions), paste its
// "Web app URL" here. It looks like:
// https://script.google.com/macros/s/XXXXXXXXXXXXXXXXXXXXXXXX/exec
const GOOGLE_SCRIPT_URL = 'PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name || !email || !message) return
    setStatus('sending')
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ name, email, message }),
      })
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
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
              <div className="py-8 text-center">
                <p className="text-2xl font-semibold text-white">Message sent.</p>
                <p className="mt-2 text-sm text-white/60">Thanks for reaching out — I'll get back to you soon.</p>
                <button
                  onClick={handleClose}
                  className="mt-6 rounded-full bg-white px-6 py-2.5 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-white">Send a message</h3>
                  <p className="mt-1 text-sm text-white/50">Goes straight to my inbox.</p>
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="you@example.com"
                  />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-widest text-white/40">Message</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="mt-2 w-full resize-none rounded-lg border border-line bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-white"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-full bg-white px-6 py-3 font-mono text-xs font-semibold uppercase tracking-widest text-black transition-transform hover:scale-105 disabled:opacity-50"
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </button>
                {status === 'error' && (
                  <p className="text-center text-xs text-red-400">Something went wrong. Try again in a moment.</p>
                )}
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
