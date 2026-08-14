import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Nav />
      <Hero />
      <Projects />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
