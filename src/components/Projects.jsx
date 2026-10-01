import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { projects } from '../data'
import ProjectStackCard from './ProjectStackCard'

const Projects = () => (
  <section className="py-20 md:py-28 bg-surface">
    <div className="container-px max-w-6xl mx-auto mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl"
      >
        <h2 className="text-4xl md:text-5xl mb-4">featured projects</h2>
        <p className="text-muted">
          Selected work that blends strategy with craft — solving real problems through thoughtful design and storytelling.
        </p>
      </motion.div>
    </div>

    <div className="relative">
      {projects.map((p, i) => (
        <ProjectStackCard key={p.slug} project={p} index={i} isLast={i === projects.length - 1} />
      ))}
    </div>

    <div className="container-px max-w-6xl mx-auto text-center mt-16">
      <Link
        to="/projects"
        className="inline-block rounded-full bg-dark text-white px-8 py-3.5 text-sm font-semibold hover:bg-primary transition-colors"
      >
        Browse All Projects
      </Link>
    </div>
  </section>
)

export default Projects
