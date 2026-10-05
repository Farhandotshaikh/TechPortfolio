import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { posts } from '../data'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const BlogsPage = () => (
  <section className="container-px pt-40 pb-24">
    <div className="max-w-5xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl md:text-6xl mb-4 text-center"
      >
        Dev insights
      </motion.h1>
      <p className="text-muted text-center max-w-xl mx-auto mb-14">
        Writing on development trends, process and the small habits that improve creative work.
      </p>

      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
    </div>
  </section>
)

export default BlogsPage
