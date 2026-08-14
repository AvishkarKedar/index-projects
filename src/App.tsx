import { MotionConfig } from 'framer-motion'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingContactButton from './components/FloatingContactButton'
import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-black text-white">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
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
      </div>
    </MotionConfig>
  )
}
