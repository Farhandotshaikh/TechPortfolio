import { Twitter, Instagram, Dribbble } from 'lucide-react'
import { profile } from '../data'

const Footer = () => (
  <footer className="bg-primary text-white">
    <div className="container-px py-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
      <div>
        <p className="opacity-80 mb-1">Email :</p>
        <p className="font-semibold">{profile.email}</p>
      </div>
      <div className="md:text-center">
        <p className="opacity-80 mb-1">Call Today :</p>
        <p className="font-semibold">{profile.phone}</p>
      </div>
      <div className="md:text-right">
        <p className="opacity-80 mb-2">Social :</p>
        <div className="flex gap-4 md:justify-end">
          <Twitter size={16} />
          <Instagram size={16} />
          <Dribbble size={16} />
        </div>
      </div>
    </div>
    <div className="border-t border-white/20">
      <div className="container-px py-5 max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 text-xs opacity-80">
        <p>© Copyright 2026. All Rights Reserved by {profile.name}.</p>
        <p>Built with React, Vite &amp; Tailwind CSS</p>
      </div>
    </div>
  </footer>
)

export default Footer
