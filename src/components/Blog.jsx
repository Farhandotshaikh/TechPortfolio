import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from '../data'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.15 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }

const Blog = () => (
  <section className="container-px py-20 md:py-28">
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-12 max-w-xl"
      >
        <h2 className="text-4xl md:text-5xl mb-4">design insights &amp; ideas</h2>
        <p className="text-muted">
          Notes on trends, process and craft — written to help you elevate your own projects.
        </p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
      >
        {posts.map((p) => (
          <motion.article key={p.slug} variants={item} whileHover={{ y: -4 }}>
            <Link to={`/blogs/${p.slug}`} className="group block">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-64 object-cover rounded-[1.75rem] mb-5 transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="flex items-center gap-3 mb-3">
                <span className="rounded-full border border-primary text-primary text-xs font-medium px-4 py-1">
                  {p.tag}
                </span>
                <span className="text-xs text-muted">{p.date}</span>
              </div>
              <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
              <p className="text-sm text-muted max-w-md">{p.excerpt}</p>
            </Link>
          </motion.article>
        ))}
      </motion.div>

      <div className="text-center mt-12">
        <Link
          to="/blogs"
          className="inline-block rounded-full border border-primary text-primary px-8 py-3.5 text-sm font-semibold hover:bg-primary hover:text-white transition-colors"
        >
          Browse All Insights
        </Link>
      </div>
    </div>
  </section>
)

export default Blog
