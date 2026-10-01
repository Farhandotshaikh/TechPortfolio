import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import { faqs } from '../data'

const FAQ = () => {
  const [open, setOpen] = useState(0)

  return (
    <section className="container-px py-20 md:py-28 bg-surface">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl mb-4">frequently asked questions</h2>
          <p className="text-muted">
            Answers to the questions I hear most as a freelance designer. Don't see yours? Reach out below.
          </p>
        </motion.div>

        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div key={f.q}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 py-5 text-left"
                >
                  <span className={`text-base md:text-lg ${isOpen ? 'text-primary' : 'text-ink'}`}>
                    <span className="text-muted mr-2">{`0${i + 1}.`}</span>
                    {f.q}
                  </span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="shrink-0 text-primary">
                    <Plus size={18} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-5 text-sm text-muted max-w-xl">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
