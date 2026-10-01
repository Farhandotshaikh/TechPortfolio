import Hero from '../components/Hero'
import Services from '../components/Services'
import About from '../components/About'
import Projects from '../components/Projects'
import Testimonials from '../components/Testimonials'
import FAQ from '../components/FAQ'
import Blog from '../components/Blog'
import Contact from '../components/Contact'
import SpotlightCarousel from '../components/SpotlightCarousel'

const items = [
  { id: 1, brand: "Tarboush", logo: "./tarboush-logo.png", mediaType: "video", media: "./tarboush-reel.mp4" },
  { id: 2, brand: "Mak Cakes", logo: "./mak-logo.png", mediaType: "video", media: "./mak-reel.mp4" },
  { id: 3, brand: "Benita Rolls", logo: "./benita-logo.png", mediaType: "video", media: "./benita-reel-1.mp4" },
  { id: 4, brand: "Timepass Chai", logo: "./tp-logo.png", mediaType: "video", media: "./tp-reel.mp4" },
  { id: 5, brand: "Baba Falooda", logo: "./baba-logo.png", mediaType: "video", media: "./baba-reel.mp4" },
  { id: 6, brand: "Benita Rolls", logo: "./benita-logo.png", mediaType: "video", media: "./benita-reel-2.mp4" },
];

const Home = () => (
  <>
    <Hero />
    <Services />
    <About />
    <Projects />
    <SpotlightCarousel items={items} interval={4500} title="AI Videos Works" />

    <Testimonials />
    <FAQ />
    <Blog />
    <Contact />
  </>
)

export default Home
