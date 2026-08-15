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
      <BrowserRouter>
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
          <KonamiEasterEgg />
          <Nav />
          <main id="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects/:slug" element={<CaseStudy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <FloatingContactButton />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}
