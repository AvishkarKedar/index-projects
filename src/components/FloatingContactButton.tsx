import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import { MailIcon } from './Icons'

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Contact me"
        className={`fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-40 flex items-center gap-2.5 rounded border border-accent bg-card px-5 py-3 font-mono text-xs text-accent shadow-card transition-opacity duration-300 hover:bg-accent/10 ${
          open ? 'pointer-events-none opacity-0' : 'opacity-100'
        }`}
      >
        <MailIcon className="h-4 w-4" />
        Contact
      </motion.button>
      <ContactForm open={open} onClose={() => setOpen(false)} />
    </>
  )
}
