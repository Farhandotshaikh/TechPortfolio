import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Twitter, Instagram, Dribbble } from 'lucide-react'
import { profile, stats } from '../data'

const Counter = ({ value, suffix }) => {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value])

  return (
    <span ref={ref} className="text-4xl md:text-5xl text-primary font-display">
      {display}{suffix}
    </span>
  )
}

const About = () => (
  <section id="about" className="container-px py-20 md:py-28">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl mb-4">about me</h2>
        <p className="text-muted mb-8 max-w-md">
          Hi, I'm {profile.name} — a digital designer and Framer developer passionate about crafting meaningful, impactful digital experiences.
        </p>

        <div className="flex flex-wrap gap-10 mb-8">
          {stats.map((s) => (
            <div key={s.label}>
              <Counter value={s.value} suffix={s.suffix} />
              <p className="text-sm text-muted mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-10 mb-8 text-sm">
          <div>
            <p className="font-semibold">Call Today :</p>
            <p className="text-muted">{profile.phone}</p>
          </div>
          <div>
            <p className="font-semibold">Email :</p>
            <p className="text-muted">{profile.email}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-8 text-ink/70">
          <Twitter size={18} />
          <Instagram size={18} />
          <Dribbble size={18} />
        </div>

        <a
          href="/about"
          className="inline-block rounded-full border border-primary text-primary px-7 py-3 text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          My Story
        </a>
      </motion.div>

      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80"
        alt="Kabir Rana portrait"
        className="rounded-[2rem] w-full h-[26rem] object-cover"
      />
    </div>
  </section>
)

export default About
