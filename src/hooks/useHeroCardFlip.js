import { useEffect, useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

/**
 * Scroll-progress-driven 3D flip for the hero image card.
 *
 * progress 0    -> flat, front-facing, full scale, resting position (page load)
 * progress ~0.55 -> rotated near edge-on (thin sliver) while sliding down
 * progress 1    -> settled into a shallow resting tilt as the hero exits
 *
 * Driven entirely by scrollYProgress (no timers/autoplay), so scrolling
 * up reverses it naturally. Rotation is scaled down on tablet/mobile
 * viewports; the downward parallax and scale stay consistent everywhere.
 */
export function useHeroCardFlip(targetRef) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  })

  const factorRef = useRef(1)

  useEffect(() => {
    const updateFactor = () => {
      const w = window.innerWidth
      if (w < 640) factorRef.current = 0.4 // mobile: keep the motion, tame the rotation
      else if (w < 1024) factorRef.current = 0.7 // tablet: slightly reduced
      else factorRef.current = 1 // desktop: full effect
    }
    updateFactor()
    window.addEventListener('resize', updateFactor)
    return () => window.removeEventListener('resize', updateFactor)
  }, [])

  const translateY = useTransform(scrollYProgress, [0, 1], [0, 200])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94])

  const rotateY = useTransform(scrollYProgress, (progress) => {
    const peak = 85 // near edge-on at the midpoint of the transition
    const settle = 12 // shallow tilt it settles into as the hero exits
    const mid = 0.55
    let deg
    if (progress <= mid) {
      deg = (progress / mid) * peak
    } else {
      deg = peak - ((progress - mid) / (1 - mid)) * (peak - settle)
    }
    return deg * factorRef.current
  })

  return { translateY, scale, rotateY }
}
