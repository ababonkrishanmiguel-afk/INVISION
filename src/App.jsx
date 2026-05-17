import React, { useEffect, useState } from 'react'
import SectionHeading from './components/SectionHeading'

const services = [
  'Short Films',
  'Music Videos',
  'Event Coverage',
  'Video Editing',
  'Graphic Design',
  'Multimedia Production'
]

const films = [
  { title: 'Red Frame', type: 'Narrative Short', year: '2025' },
  { title: 'Afterlight', type: 'Music Video', year: '2024' },
  { title: 'Pulse of Manila', type: 'Event Film', year: '2024' }
]

const team = [
  { name: 'Creative Director', role: 'Story, visual language, final tone.' },
  { name: 'Lead Cinematographer', role: 'Camera movement and cinematic framing.' },
  { name: 'Post Producer', role: 'Editing rhythm, color, and finishing.' }
]

const gallery = ['Frame Study I', 'Motion Portrait II', 'Noir Light III', 'Studio Cut IV', 'Urban Echo V', 'Final Reel VI']

function CinematicVideoBg() {
  return (
    <div className="cinematic-video-wrap" aria-hidden="true">
      <video className="cinematic-video" autoPlay muted loop playsInline preload="auto" poster="/invision-video-poster.jpg">
        <source src="/invision-logo-bg.mp4" type="video/mp4" />
      </video>
      <div className="cinematic-video-vignette" />
    </div>
  )
}

export default function App() {
  const [logoMissing, setLogoMissing] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 1800)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-smoke">
      <CinematicVideoBg />

      {showIntro ? (
        <div className="intro-overlay">
          <div className="intro-ring" />
          <h1 className="intro-title">INVISION</h1>
          <p className="intro-sub">FILMS PRODUCTIONS</p>
        </div>
      ) : null}

      <div className="grain-overlay pointer-events-none absolute inset-0 z-10" />

      <header className="fixed top-3 left-0 right-0 z-40">
        <nav className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <div className="glass-nav w-full rounded-2xl px-5 py-3">
            <div className="flex items-center justify-between">
              <a href="#hero" className="font-display text-xl tracking-widest text-white">INVISION</a>
              <div className="hidden gap-6 text-xs uppercase tracking-[0.2em] md:flex">
                <a href="#about" className="nav-link">About</a>
                <a href="#films" className="nav-link">Films</a>
                <a href="#services" className="nav-link">Services</a>
                <a href="#team" className="nav-link">Team</a>
                <a href="#portfolio" className="nav-link">Portfolio</a>
                <a href="#contact" className="nav-link">Contact</a>
              </div>
            </div>
            <div className="mobile-nav mt-3 md:hidden">
              <a href="#about">About</a>
              <a href="#films">Films</a>
              <a href="#services">Services</a>
              <a href="#portfolio">Work</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className="section-shell relative flex min-h-screen items-center">
          <div className="hero-gradient absolute inset-0" />
          <div className="hero-illustration">
            <div className="hero-layer hero-layer-a" />
            <div className="hero-layer hero-layer-b" />
            <div className="hero-layer hero-layer-c" />
            <div className="hero-story">
              <p>From concept and script to camera and final grade, every frame serves a feeling.</p>
            </div>
          </div>
          <img src="/invision-banner.jpg" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20" />

          <div className="mx-auto grid w-[92%] max-w-6xl items-center gap-10 py-28 lg:grid-cols-[1.1fr_1fr]">
            <div className="relative mx-auto w-full max-w-[360px] lg:mx-0">
              {!logoMissing ? (
                <img src="/invision-logo.png" alt="INVISION logo" onError={() => setLogoMissing(true)} className="logo-image w-full rounded-full border border-blood/40" />
              ) : (
                <div className="fallback-logo"><span>INVISION</span></div>
              )}
            </div>
            <div className="relative">
              <p className="mb-2 font-display text-xs uppercase tracking-[0.45em] text-ember">Independent Production Studio</p>
              <h1 className="font-display text-5xl uppercase leading-[0.95] text-white md:text-7xl">INVISION Films Productions</h1>
              <p className="mt-5 text-xl text-slate-200">Same Interest. Same Vision.</p>
              <p className="mt-4 max-w-xl text-slate-300">Cinematic stories, multimedia production, and creative visuals built with passion.</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="#portfolio" className="btn-primary">View Portfolio</a>
                <a href="#contact" className="btn-secondary">Start a Project</a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="section-shell">
          <SectionHeading eyebrow="About Invision" title="Bold Visual Storytelling" subtitle="INVISION is a creative production collective focused on cinematic emotion, disciplined craft, and meaningful narrative." />
          <div className="mx-auto max-w-4xl text-center text-base leading-relaxed text-slate-300">
            We create films and multimedia work that blend mood, movement, and message. From pre-production planning to post-production finishing, our process is collaborative and intentional, built to shape stories that stay with audiences.
          </div>
        </section>

        <section id="films" className="section-shell bg-gradient-to-b from-black/0 to-blood/10">
          <SectionHeading eyebrow="Featured Films" title="Recent Projects" />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {films.map((film, idx) => (
              <article key={film.title} className={`modern-card bento-card group h-full p-6 ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <div className="mb-5 h-40 rounded-lg bg-gradient-to-br from-blood/40 to-black/80 transition-transform duration-500 group-hover:scale-[1.02]" />
                <p className="font-display text-xs uppercase tracking-[0.3em] text-ember">{film.type}</p>
                <h3 className="mt-2 font-display text-2xl uppercase text-white">{film.title}</h3>
                <p className="mt-2 text-slate-400">{film.year}</p>
                <p className="mt-4 inline-block border-b border-ember pb-1 text-xs uppercase tracking-[0.2em] text-ember">Project {String(idx + 1).padStart(2, '0')}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="services" className="section-shell">
          <SectionHeading eyebrow="Services" title="Production Capabilities" />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {services.map((service) => (
              <div key={service} className="service-chip bento-card"><span>{service}</span></div>
            ))}
          </div>
        </section>

        <section id="team" className="section-shell bg-gradient-to-b from-blood/5 to-black">
          <SectionHeading eyebrow="Creative Collective" title="The Team" />
          <div className="mx-auto grid w-[92%] max-w-6xl gap-6 md:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="modern-card p-6">
                <h3 className="font-display text-2xl uppercase text-white">{member.name}</h3>
                <p className="mt-3 text-slate-300">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio" className="section-shell">
          <SectionHeading eyebrow="Portfolio" title="Cinematic Gallery" subtitle="Hover each frame to reveal a subtle preview glow and motion lift." />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {gallery.map((item, idx) => (
              <div key={item} className={`portfolio-card bento-card group ${idx === 2 ? 'md:col-span-2' : ''}`}>
                <div className="h-52 rounded-lg bg-gradient-to-tr from-black to-blood/60 transition-all duration-500 group-hover:from-blood/30 group-hover:to-black" />
                <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">{item}</p>
                <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Scene {idx + 1}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell pb-28">
          <SectionHeading eyebrow="Contact" title="Let's Build The Next Story" />
          <div className="modern-card mx-auto w-[92%] max-w-3xl p-8 text-center">
            <p className="text-base text-slate-300">Email: invisionfilms21@gmail.com</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a className="btn-secondary" href="https://instagram.com/invision.films" target="_blank" rel="noreferrer">Instagram</a>
              <a className="btn-secondary" href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
              <a className="btn-secondary" href="mailto:invisionfilms21@gmail.com">Email Us</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-slate-300">INVISION FILMS PRODUCTIONS â€¢ SAME INTEREST. SAME VISION.</p>
      </footer>
    </div>
  )
}
