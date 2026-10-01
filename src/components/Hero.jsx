import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Hand } from 'lucide-react'
import { profile } from '../data'
import { useHeroCardFlip } from '../hooks/useHeroCardFlip'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const Hero = () => {
  const sectionRef = useRef(null)
  const { translateY, scale, rotateY } = useHeroCardFlip(sectionRef)

  return (
  <section ref={sectionRef} className="container-px pt-40 pb-20 md:pt-48 md:pb-28">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-8 max-w-6xl mx-auto text-center md:text-left">
      <motion.div initial="hidden" animate="show" variants={fadeUp}>
        <p className="uppercase text-xs tracking-[0.25em] font-semibold text-ink/60 mb-3">
          {profile.name}
        </p>
        <h1 className="text-5xl md:text-7xl">Web Developer</h1>
      </motion.div>

      <div className="relative mx-auto" style={{ perspective: 1200 }}>
        <motion.img
          src="./Farhan.jpg"
          alt="Farhan Shaikh Web Developer"
          style={{
            y: translateY,
            scale,
            rotateY,
            transformStyle: 'preserve-3d',
            transformOrigin: 'center center',
            willChange: 'transform',
          }}
          className="w-64 h-80 md:w-80 md:h-[26rem] object-cover rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)]"
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-primary flex items-center justify-center shadow-lg"
        >
          <Hand className="text-white" size={26} />
        </motion.div>
      </div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} transition={{ delay: 0.2 }}>
        <h1 className="text-5xl md:text-7xl mb-4">AI Creator</h1>
        <p className="text-muted max-w-xs mx-auto md:mx-0">{profile.tagline}</p>
      </motion.div>
    </div>
  </section>  
  )
}

export default Hero
