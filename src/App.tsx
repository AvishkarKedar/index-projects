import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContactButton from './components/FloatingContactButton'
import CustomCursor from './components/CustomCursor'
import ThemeToggle from './components/ThemeToggle'

const PageIntro = lazy(() => import('./components/PageIntro'))
const CursorSpotlight = lazy(() => import('./components/CursorSpotlight'))

const ORIGINAL_TITLE = 'Avishkar Kedar — Projects'

export default function App() {
  useEffect(() => {
    function handleVisibility() {
      document.title = document.hidden ? '👋 come back — Avishkar Kedar' : ORIGINAL_TITLE
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-bg text-fg">
        <Suspense fallback={null}>
          <PageIntro />
        </Suspense>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Suspense fallback={null}>
          <CursorSpotlight />
        </Suspense>
        <CustomCursor />
        <Nav />
        <main id="main-content">
          <Hero />
          <Projects />
          <About />
          <Contact />
        </main>
        <Footer />
        <FloatingContactButton />
        <ThemeToggle />
      </div>
    </MotionConfig>
  )
}
