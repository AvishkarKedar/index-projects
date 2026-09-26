import { useState } from 'react'
import ContactForm from './ContactForm'
import { PROFILE } from '../data/projects'
import { FadeUp, SectionHeading } from './Reveal'
import { MailIcon } from './Icons'

export default function Contact() {
  const [formOpen, setFormOpen] = useState(false)

  return (
    <section id="contact" className="scroll-mt-24 px-6 py-24 sm:px-10">
      <div className="mx-auto w-full max-w-wrap">
        <SectionHeading index="04" title="Get in touch" />

        <FadeUp delay={0.05}>
          <p className="mt-8 max-w-xl leading-relaxed text-muted">
            I&apos;m open to new opportunities, collaborations, and interesting problems — my inbox
            is always open. Whether you have a question about something I&apos;ve built or just want
            to say hi, I&apos;ll do my best to get back to you.
          </p>
        </FadeUp>

        <FadeUp delay={0.12}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={`mailto:${PROFILE.email}`}
              className="inline-flex items-center gap-2.5 rounded border border-accent px-7 py-4 font-mono text-sm text-accent transition-colors duration-300 hover:bg-accent/10"
            >
              <MailIcon className="h-4 w-4" />
              Say hello
            </a>
            <button
              onClick={() => setFormOpen(true)}
              className="font-mono text-sm text-muted underline decoration-fg/30 underline-offset-8 transition-colors hover:text-accent"
            >
              or use the form — goes straight to my inbox
            </button>
          </div>
        </FadeUp>

        <FadeUp delay={0.18}>
          <p className="mt-6 font-mono text-xs text-muted/80">{PROFILE.availability}</p>
        </FadeUp>
      </div>

      {/* The contact form — straight to the inbox, unchanged behaviour */}
      <ContactForm open={formOpen} onClose={() => setFormOpen(false)} />
    </section>
  )
}
