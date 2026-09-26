import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import FloatingContactButton from './components/FloatingContactButton'
import Home from './pages/Home'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'

const ORIGINAL_TITLE = 'Avishkar Kedar — Project Index'

export default function App() {
  useEffect(() => {
    function handleVisibility() {
      document.title = document.hidden ? 'Still shipping — Avishkar Kedar' : ORIGINAL_TITLE
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <div className="relative min-h-screen bg-bg text-fg">
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<CaseStudy />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
          <FloatingContactButton />
        </div>
      </BrowserRouter>
    </MotionConfig>
  )
}
