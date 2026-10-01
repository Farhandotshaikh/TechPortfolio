import { useScroll, useTransform } from 'framer-motion'

/**
 * Ties an element's 3D rotation + opacity to its own scroll position.
 * As it scrolls up from the bottom of the viewport it flips from an
 * edge-on sliver into full view, holds flat while centered, then
 * flips away again on its way out the top — the "closing lid" effect.
 */
export function useFlipOnScroll(ref, { rotate = [65, 0, -65] } = {}) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], rotate)
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0])

  return { rotateX, opacity }
}
