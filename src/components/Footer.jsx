import { Instagram, Github } from 'lucide-react'
import { profile } from '../data'

const socialIcons = { IG: Instagram, GH: Github }

const Footer = () => (
  <footer className="relative isolate overflow-hidden bg-black text-white">
    <div className="container-px py-10 md:ml-12 md:mr-12 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm relative z-10">
      <div>
        <p className="opacity-80 mb-1">Email :</p>
        <p className="font-semibold">{profile.email}</p>
      </div>
      <div className="md:text-center">
        <p className="opacity-80 mb-1">Call Today :</p>
        <p className="font-semibold">{profile.phone}</p>
      </div>
      <div className="md:text-right">
        <p className="opacity-100 mb-2">Social :</p>
        <div className="flex gap-2 md:justify-end">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.label]

            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.label} profile (opens in a new tab)`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white hover:bg-white/70" 
              >
                {Icon ? <Icon size={20} aria-hidden="true" /> : social.label}
              </a>
            )
          })}
        </div>
      </div>
    </div>
    <div className="border-t border-white/20">
      <div className="container-px py-5 md:ml-12 md:mr-12 flex flex-col md:flex-row justify-between items-center gap-2 text-xs opacity-80 relative z-10">
        <p>© Copyright 2026. All Rights Reserved by {profile.name}.</p>
      
      </div>
    </div>
    <div aria-hidden="true" className="relative h-28 overflow-hidden sm:h-40 md:h-52">
      <span
        className="pointer-events-none absolute bottom-[-0.16em] left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[10rem] leading-[0.8] text-white/60 sm:text-[14rem] md:text-[18rem] md:tracking-widest"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Farhan
      </span>
    </div>
  </footer>
)

export default Footer
