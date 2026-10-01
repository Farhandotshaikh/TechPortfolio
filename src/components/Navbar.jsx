import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Projects', to: '/projects' },
  { label: 'Blogs', to: '/blogs' },
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-4 left-0 right-0 z-50 mx-auto w-[calc(100%-2rem)] sm:w-[80%] md:w-[65%] lg:w-[50%]"
    >
      <div className="rounded-2xl sm:rounded-full border border-black/5 bg-white/90 px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-md">

        {/* Main Navbar */}
        <div className="flex items-center justify-between">

          {/* Left - Avatar */}
          <div className="flex items-center">
            <img
              src="./Farhan.jpg"
              alt="Farhan Shaikh avatar"
              className="h-9 w-9 rounded-full object-cover"
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center justify-center gap-5 md:gap-6 text-sm font-medium text-ink/80">
            {links.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="whitespace-nowrap transition-colors hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-2">

            {/* Contact */}
            <Link
              to="/#contact"
              className="rounded-full bg-dark px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white transition-colors hover:bg-primary"
            >
              Contact
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex sm:hidden h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              <div className="flex flex-col gap-1.5">
                <span
                  className={`block h-0.5 w-4 bg-dark transition-transform duration-300 ${
                    isOpen ? 'translate-y-2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-dark transition-opacity duration-300 ${
                    isOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block h-0.5 w-4 bg-dark transition-transform duration-300 ${
                    isOpen ? '-translate-y-2 -rotate-45' : ''
                  }`}
                />
              </div>
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="overflow-hidden sm:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-black/5 pt-3 mt-3 pb-2">
                {links.map((l) => (
                  <Link
                    key={l.label}
                    to={l.to}
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink/80 transition-colors hover:bg-black/5 hover:text-primary"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

      </div>
    </motion.header>
  )
}

export default Navbar
