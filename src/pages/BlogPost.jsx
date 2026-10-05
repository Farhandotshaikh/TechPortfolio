import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock } from 'lucide-react'
import { posts } from '../data'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.06 } }),
}

const BlogPost = () => {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [slug])

  // Unknown slug — send back to the insights list rather than a blank page.
  if (!post) {
    return <Navigate to="/blogs" replace />
  }

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 2)

  return (
    <article className="pt-32 md:pt-40 pb-24">
      <div className="container-px max-w-3xl mx-auto">
        <motion.div initial="hidden" animate="show" custom={0} variants={fadeUp}>
          <Link to="/blogs" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-8">
            <ArrowLeft size={16} />
            Back to Insights
          </Link>
        </motion.div>

        <motion.div initial="hidden" animate="show" custom={1} variants={fadeUp} className="flex items-center gap-3 mb-5">
          <span className="rounded-full border border-primary text-primary text-xs font-medium px-4 py-1">
            {post.tag}
          </span>
          <span className="text-xs text-muted">{post.date}</span>
          {post.readTime && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <Clock size={12} />
              {post.readTime}
            </span>
          )}
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="show"
          custom={2}
          variants={fadeUp}
          className="text-4xl md:text-6xl mb-6"
        >
          {post.title}
        </motion.h1>

        {post.author && (
          <motion.p initial="hidden" animate="show" custom={3} variants={fadeUp} className="text-sm text-muted mb-10">
            By <span className="font-semibold text-ink">{post.author}</span>
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="container-px max-w-5xl mx-auto mb-12"
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 sm:h-80 md:h-[28rem] object-cover rounded-[1.75rem] md:rounded-[2rem]"
        />
      </motion.div>

      <div className="container-px max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } } }}
          className="space-y-6 text-base leading-relaxed text-ink/80"
        >
          {(post.content ?? [post.excerpt]).map((paragraph, i) => (
            <motion.p key={i} variants={fadeUp}>
              {paragraph}
            </motion.p>
          ))}
        </motion.div>

        {related.length > 0 && (
          <div className="mt-20 pt-10 border-t border-black/10">
            <h2 className="text-2xl md:text-3xl mb-8">more insights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {related.map((p) => (
                <Link key={p.slug} to={`/blogs/${p.slug}`} className="group block">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded-2xl mb-4 transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <span className="text-xs text-primary font-medium">{p.tag}</span>
                  <h3 className="text-lg mt-1 group-hover:text-primary transition-colors">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default BlogPost
