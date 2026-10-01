import { useState } from 'react'
import { motion } from 'framer-motion'
import { Hand } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08 } }),
}

const Contact = () => {
  const [sent, setSent] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submissionError, setSubmissionError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setSubmitting(true)
    setSubmissionError('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/shaikhfarhan.dev@gmail.com', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      })
      const result = await response.json()

      if (!response.ok || (result.success !== true && result.success !== 'true')) {
        throw new Error('The message could not be sent. Please try again.')
      }

      form.reset()
      setSent(true)
    } catch {
      setSubmissionError('The message could not be sent. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="container-px py-20 md:py-28">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative hidden md:block"
        >
          <img
            src="https://images.unsplash.com/photo-1487338875411-8880f74114a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Kabir Rana"
            className="rounded-[2rem] w-full h-[26rem] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-primary flex items-center justify-center">
            <Hand className="text-white" size={26} />
          </div>
        </motion.div>

        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl mb-4"
          >
            let's work together
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-muted mb-8 max-w-md"
          >
            Let's build something impactful together — whether it's your brand, your website, or your next big idea.
          </motion.p>

            <form
              action="https://formsubmit.co/ajax/shaikhfarhan.dev@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={fadeUp} custom={0} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <label className="text-xs font-semibold text-primary">Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    required
                    name="name"
                    className="mt-1 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>
                <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="show" viewport={{ once: true }}>
                  <label className="text-xs font-semibold text-primary">Email</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    required
                    name="email"
                    className="mt-1 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </motion.div>
              </div>

              <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <label className="text-xs font-semibold text-primary">Service Needed?</label>
                <select  name="service" className="mt-1 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary">
                  <option>CMS Website Development</option>
                  <option>Shopify Store Development</option>
                  <option>Custom Site Development</option>
                  <option>AI Video Creation</option>
                </select>
              </motion.div>

              <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="show" viewport={{ once: true }}>
                <label className="text-xs font-semibold text-primary">What can I help you with?</label>
                <textarea
                  rows={4}
                  placeholder="Hello, I'd like to enquire about..."
                  name="message"
                  className="mt-1 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </motion.div>

              <motion.button
                type="submit"
                disabled={submitting}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full border border-primary text-primary font-semibold text-sm px-8 py-3.5 hover:bg-primary hover:text-white transition-colors disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? 'Sending...' : 'Submit'}
              </motion.button>

              {submissionError && <p role="alert" className="text-sm text-red-600">{submissionError}</p>}
              <input type="hidden" name="_subject" value="New service enquiry" />
              <input type="hidden" name="_template" value="table" />
            </form>
        </div>
      </div>

      {sent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" role="presentation">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-success-title"
            className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl"
          >
            <h3 id="contact-success-title" className="mb-3 text-2xl font-semibold">Message sent</h3>
            <p className="mb-6 text-sm text-muted">Thanks for reaching out. I'll get back to you within a couple of days.</p>
            <button
              type="button"
              onClick={() => setSent(false)}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default Contact
