import { lazy, Suspense, useEffect } from 'react'
import { MotionConfig } from 'framer-motion'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import FloatingContactButton from './components/FloatingContactButton'
import CustomCursor from './components/CustomCursor'
import KonamiEasterEgg from './components/KonamiEasterEgg'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'

const PageIntro = lazy(() => import('./components/PageIntro'))
const CursorSpotlight = lazy(() => import('./components/CursorSpotlight'))
const Starfield = lazy(() => import('./components/Starfield'))

const ORIGINAL_TITLE = 'Avishkar Kedar — Project Index'

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
      <BrowserRouter>
        <div className="grain min-h-screen bg-bg text-fg">
          {/* Interactive 3D starfield — fixed behind everything */}
          <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
            <Suspense fallback={null}>
              <Starfield />
            </Suspense>
          </div>

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
          <KonamiEasterEgg />
          <Nav />
          <main id="main-content" className="relative z-10">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <div className="relative z-10">
            <Footer />
          </div>
          <FloatingContactButton />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}
