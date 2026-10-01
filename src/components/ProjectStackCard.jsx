import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

/**
 * One card in the sticky, overlapping project stack.
 *
 * Each card lives inside a tall wrapper (extra scroll room) and is
 * `position: sticky` at a small, increasing top offset per index. As the
 * user scrolls through that wrapper's height, the card stays pinned near
 * the top of the viewport while the next card (higher z-index, slightly
 * larger sticky offset) rises up and overlaps it — giving the layered,
 * "cards being revealed one after another" effect from the reference.
 *
 * A subtle scroll-linked scale-down + darken on the card itself makes it
 * visually recede into the background layer once the next card covers it,
 * without ever fading it out or moving it independently of scroll.
 */
const ProjectStackCard = ({ project, index, isLast }) => {
  const wrapperRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])
  const recede = useTransform(scrollYProgress, [0, 1], [0, 0.35])

  // Small, increasing sticky offset per card — shrinks on narrow viewports
  // via the vw component of clamp() so mobile gets a tighter stack.
  const topOffset = `clamp(10px, ${3 + index * 2}vw, ${28 + index * 36}px)`

  return (
    <div ref={wrapperRef} style={{ height: isLast ? 'auto' : '100vh' }} className="relative">
      <div className="sticky flex justify-center" style={{ top: topOffset, zIndex: index + 1 }}>
        <motion.div
          style={{ scale }}
          className="relative overflow-hidden rounded-[18px] md:rounded-[22px] shadow-[0_25px_60px_-20px_rgba(0,0,0,0.35)] w-[90vw] sm:w-[85vw] md:w-[82vw] max-w-[1120px] h-[380px] sm:h-[480px] md:h-[620px]"
        >
          <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
          <motion.div style={{ opacity: recede }} className="absolute inset-0 bg-black pointer-events-none" />

          <div className="absolute top-5 left-5 flex items-center gap-3">
            <span className="rounded-full bg-primary/90 text-white text-xs font-medium px-4 py-1.5">
              {project.category}
            </span>
            <motion.span
              whileHover={{ rotate: 45 }}
              className="h-9 w-9 rounded-full bg-primary flex items-center justify-center text-white"
            >
              <ArrowUpRight size={16} />
            </motion.span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <h3 className="text-2xl md:text-4xl mb-2">{project.title}</h3>
            <p className="text-sm text-white/80 max-w-md">{project.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ProjectStackCard
