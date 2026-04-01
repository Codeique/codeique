import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AISection from '../components/AISection'
import SystemsSection from '../components/SystemsSection'
import AboutSection from '../components/AboutSection'
import Footer from '../components/Footer'
import BackgroundShapes from '../components/BackgroundShapes'
import ScrollProgress from '../components/ScrollProgress'

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <BackgroundShapes />
      <Navbar />
      <main>
        <Hero />
        <AISection />
        <SystemsSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  )
}
