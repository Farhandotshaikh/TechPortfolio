import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { testimonials } from '../data'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const Card = ({ t }) => (
  <motion.div variants={item} whileHover={{ y: -4 }} className="rounded-[1.75rem] bg-surface p-7">
    <div className="flex gap-1 text-primary mb-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
      ))}
    </div>
    <p className="text-sm text-ink/80 mb-6">{t.quote}</p>
    <p className="font-semibold text-sm">{t.name}</p>
    <p className="text-xs text-muted">{t.role}</p>
  </motion.div>
)

const StatCard = ({ label, value, dark }) => (
  <motion.div
    variants={item}
    whileHover={{ y: -4 }}
    className={`rounded-[1.75rem] p-7 flex flex-col justify-between ${dark ? 'bg-dark text-white' : 'bg-primary text-white'}`}
  >
    <p className="text-sm mb-8 opacity-90">{label}</p>
    <span className="text-4xl md:text-5xl font-display">{value}</span>
  </motion.div>
)

const Testimonials = () => (
  <section className="container-px py-20 md:py-28">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-xl"
      >
        <h2 className="text-4xl md:text-5xl mb-4">what my clients say</h2>
        <p className="text-muted">
          Feedback from people I've partnered with — their trust keeps me pushing for work that makes an impact.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card t={testimonials[0]} />
        <Card t={testimonials[1]} />
        <StatCard label="I've partnered with 25+ happy clients" value="96%" dark />
        <StatCard label="Client work that helped grow revenue" value="180%" />
        <Card t={testimonials[2]} />
        <Card t={testimonials[3]} />
      </motion.div>
    </div>
  </section>
)

export default Testimonials
