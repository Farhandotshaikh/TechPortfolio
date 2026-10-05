import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Twitter, Instagram, Dribbble, Github } from 'lucide-react'
import { profile, stats } from '../data'
import Contact from './Contact'

const socialIcons = { IG: Instagram, GH: Github }

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
          Hi, I'm {profile.name} — a web developer and AI creator based in India. I specialize in building CMS websites, Shopify stores, custom web applications, and AI-generated videos that help businesses and creators grow their online presence.
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
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.label]

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} profile (opens in a new tab)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-white/70"
              >
                {Icon ? <Icon size={20} aria-hidden="true" /> : social.label}
              </a>
            )
          })}
        </div>

      
      </motion.div>

      <motion.img
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        src="./farhan-about.jpg"
        alt="Farhan Shaikh portrait"
        className="rounded-[2rem] w-full h-[36rem] object-cover object-top"
      />
    </div>

    <Contact />
  </section>
)

export default About
