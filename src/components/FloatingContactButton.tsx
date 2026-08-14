import { useState } from 'react'
import { motion } from 'framer-motion'
import ContactForm from './ContactForm'
import Magnetic from './Magnetic'

export default function FloatingContactButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Magnetic
        strength={0.3}
        className="fixed z-40 bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))]"
      >
        <motion.button
          onClick={() => setOpen(true)}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Contact me"
          data-cursor="Contact"
          className="flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 font-mono text-xs font-semibold uppercase tracking-widest text-black shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-black" />
          </span>
          Contact Me
        </motion.button>
      </Magnetic>
      <ContactForm open={open} onClose={() => setOpen(false)} />
    </>
  )
}
