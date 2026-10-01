import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, CheckCircle2 } from 'lucide-react'
import { services } from '../data'
import { useFlipOnScroll } from '../hooks/useFlipOnScroll'

const Services = () => {
  const [open, setOpen] = useState(0)
  const imgRef = useRef(null)
  const { rotateX, opacity } = useFlipOnScroll(imgRef, { rotate: [70, 0, -70] })

  return (
    <section className="container-px py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            what i can do for you
          </motion.h2>
          <p className="text-muted mb-10 max-w-md">
            As a digital designer, I'm a visual storyteller — crafting experiences that connect deeply and spark creativity.
          </p>

          <div className="divide-y divide-black/10 border-t border-black/10">
            {services.map((service, i) => {
              const isOpen = open === i
              return (
                <div key={service.title}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className={`w-full flex items-center justify-between py-5 text-left transition-colors ${isOpen ? 'text-primary' : 'text-ink'}`}
                  >
                    <span className="text-xl md:text-2xl" style={{ fontFamily: 'var(--font-display)', fontWeight: 300 }} >
                      {`${i + 1}. ${service.title}`}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 180 : 0 }}>
                      <ChevronDown size={20} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-5 space-y-3">
                          {service.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-sm text-muted">
                              <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        <div className="hidden md:block" style={{ perspective: 1400 }}>
          <motion.img
            ref={imgRef}
            src="https://images.unsplash.com/photo-1547658719-da2b51169166?w=900&q=80"
            alt="Designer's desk setup"
            style={{ rotateX, opacity, transformOrigin: 'bottom center' }}
            className="rounded-[2rem] w-full h-[28rem] object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default Services
