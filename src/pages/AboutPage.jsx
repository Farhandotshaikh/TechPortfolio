import { motion } from 'framer-motion'
import About from '../components/About'
import { profile } from '../data'
import { Contact } from 'lucide-react'
import Contact from '../components/Contact'

const AboutPage = () => (
  <>
    <section className="container-px pt-40 pb-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl mb-4"
      >
        my story
      </motion.h1>
      <p className="text-muted max-w-xl mx-auto">
        A closer look at how {profile.name} approaches design, from first sketch to shipped product.
      </p>
    </section>
    <About />
    <Contact />
  </>
)

export default AboutPage
