import { motion } from 'framer-motion'
import { projects } from '../data'
import SpotlightCarousel from '../components/SpotlightCarousel'

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } }
const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }

const items = [
  { id: 1, brand: "Tarboush", logo: "./tarboush-logo.png", mediaType: "video", media: "./tarboush-reel.mp4" },
  { id: 2, brand: "Mak Cakes", logo: "./mak-logo.png", mediaType: "video", media: "./mak-reel.mp4" },
  { id: 3, brand: "Benita Rolls", logo: "./benita-logo.png", mediaType: "video", media: "./benita-reel-1.mp4" },
  { id: 4, brand: "Timepass Chai", logo: "./tp-logo.png", mediaType: "video", media: "./tp-reel.mp4" },
  { id: 5, brand: "Baba Falooda", logo: "./baba-logo.png", mediaType: "video", media: "./baba-reel.mp4" },
  { id: 6, brand: "Benita Rolls", logo: "./benita-logo.png", mediaType: "video", media: "./benita-reel-2.mp4" },
];

const ProjectsPage = () => (
  <>
    <section className="container-px pt-40 pb-24">
      <div className="max-w-6xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-6xl mb-4 text-center"
        >
          all projects
        </motion.h1>
        <p className="text-muted text-center max-w-xl mx-auto mb-14">
          A fuller archive of branding, product and web design work across clients and industries.
        </p>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((p) => (
            <motion.div key={p.slug} variants={item} className="group overflow-hidden rounded-[2rem] bg-surface">
              <img
                src={p.image}
                alt={p.title}
                className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="p-6">
                <span className="text-xs font-medium text-primary">{p.category}</span>
                <h3 className="text-2xl mt-2 mb-2">{p.title}</h3>
                <p className="text-sm text-muted">{p.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
    <SpotlightCarousel items={items} interval={4500} title="AI Videos Works" />
  </>
)

export default ProjectsPage
