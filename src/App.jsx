import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { posts } from './data'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import AboutPage from './pages/AboutPage'
import ProjectsPage from './pages/ProjectsPage'
import BlogsPage from './pages/BlogsPage'
import BlogPost from './pages/BlogPost'

const defaultMetadata = {
  title: 'Farhan Shaikh | Web Developer & AI Creator',
  description: 'Farhan Shaikh is an India-based web developer and AI creator building CMS websites, Shopify stores, custom websites, and AI videos.',
}

const routeMetadata = {
  '/about': {
    title: 'About Farhan Shaikh | Web Developer & AI Creator',
    description: 'Learn about Farhan Shaikh, an India-based web developer and AI creator specializing in CMS, Shopify, custom websites, and AI videos.',
  },
  '/projects': {
    title: 'Web Development Projects | Farhan Shaikh',
    description: 'Explore Shopify stores, CMS websites, and custom web development projects by Farhan Shaikh.',
  },
  '/blogs': {
    title: 'Web Development & AI Video Insights | Farhan Shaikh',
    description: 'Insights on CMS websites, Shopify store development, custom websites, and AI video creation.',
  },
}

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const normalizedPath = pathname === '/' ? '/' : pathname.replace(/\/+$/, '')
    const postSlug = normalizedPath.startsWith('/blogs/') ? normalizedPath.slice('/blogs/'.length) : null
    const post = posts.find((item) => item.slug === postSlug)
    const metadata = post
      ? { title: `${post.title} | Farhan Shaikh`, description: post.excerpt }
      : routeMetadata[normalizedPath] || defaultMetadata

    document.title = metadata.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[name="twitter:title"]')?.setAttribute('content', metadata.title)
    document.querySelector('meta[name="twitter:description"]')?.setAttribute('content', metadata.description)
    document.querySelector('meta[property="og:type"]')?.setAttribute('content', post ? 'article' : 'website')
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/blogs" element={<BlogsPage />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
