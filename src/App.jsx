import React, { useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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

function FadeUp({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CinematicVideoBg() {
  return (
    <div className="cinematic-video-wrap" aria-hidden="true">
      <video className="cinematic-video" autoPlay muted loop playsInline preload="auto">
        <source src="/invision-logo-bg.mp4" type="video/mp4" />
      </video>
      <div className="cinematic-video-vignette" />
    </div>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [introExiting, setIntroExiting] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, -90])

  useEffect(() => {
    const syncViewport = () => setIsMobile(window.innerWidth < 768)
    syncViewport()
    window.addEventListener('resize', syncViewport)

    const exitTimer = setTimeout(() => setIntroExiting(true), 1100)
    const doneTimer = setTimeout(() => {
      setShowIntro(false)
      setIntroDone(true)
    }, 2200)

    return () => {
      window.removeEventListener('resize', syncViewport)
      clearTimeout(exitTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-smoke">
      <CinematicVideoBg />

      {showIntro ? (
        <motion.div
          className="intro-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: introExiting ? 0 : 1 }}
          transition={{ duration: 0.85, ease: 'easeOut' }}
        >
          <div className="intro-spotlight" />
          <motion.img
            src="/invision_logo_transparent.png"
            alt="INVISION logo intro"
            className="intro-logo"
            initial={{ opacity: 0, scale: 0.84 }}
            animate={
              introExiting
                ? { opacity: 0.65, scale: isMobile ? 0.64 : 0.56, x: isMobile ? -120 : -360, y: isMobile ? 64 : 94 }
                : { opacity: 1, scale: 1.02, x: 0, y: 0 }
            }
            transition={{ duration: introExiting ? 0.95 : 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={introExiting ? { opacity: 0, y: -12, scale: 0.97 } : { opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: introExiting ? 0 : 0.35, duration: 0.75 }}
            className="intro-sub"
          >
            INVISION FILMS PRODUCTIONS
          </motion.h1>
        </motion.div>
      ) : null}

      <div className="grain-overlay pointer-events-none absolute inset-0 z-10" />

      <header className="fixed top-3 left-0 right-0 z-40">
        <nav className="mx-auto flex w-[92%] max-w-6xl items-center justify-between py-4">
          <div className="glass-nav w-full rounded-2xl px-5 py-3">
            <div className="flex items-center justify-between">
              <a href="#hero" className="inline-flex items-center gap-3">
                <img src="/invision_logo_transparent.png" alt="INVISION logo" className="brand-logo-nav" />
                <span className="font-display text-xl tracking-widest text-white">INVISION</span>
              </a>
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
          <motion.div style={{ y: heroY }} className={`mx-auto grid w-[92%] max-w-6xl items-center gap-10 py-28 lg:grid-cols-[1.1fr_1fr] ${introDone ? 'hero-ready' : 'hero-hidden'}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[420px] lg:mx-0"
            >
              <img src="/invision_logo_transparent.png" alt="INVISION logo" className="logo-image logo-hero" />
            </motion.div>
            <div className="relative">
              <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="mb-2 font-display text-xs uppercase tracking-[0.45em] text-ember">
                Independent Production Studio
              </motion.p>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }} className="font-display text-5xl uppercase leading-[0.95] text-white md:text-7xl">
                INVISION Films Productions
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.75 }} className="mt-5 text-xl text-slate-200">
                Same Interest. Same Vision.
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.75 }} className="mt-4 max-w-xl text-slate-300">
                Cinematic stories, multimedia production, and creative visuals built with passion.
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.75 }} className="mt-8 flex flex-wrap gap-4">
                <a href="#portfolio" className="btn-primary">View Portfolio</a>
                <a href="#contact" className="btn-secondary">Start a Project</a>
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="section-shell">
          <SectionHeading eyebrow="About Invision" title="Bold Visual Storytelling" subtitle="INVISION is a creative production collective focused on cinematic emotion, disciplined craft, and meaningful narrative." />
          <FadeUp className="mx-auto max-w-4xl text-center text-base leading-relaxed text-slate-300">
            We create films and multimedia work that blend mood, movement, and message. From pre-production planning to post-production finishing, our process is collaborative and intentional, built to shape stories that stay with audiences.
          </FadeUp>
        </section>

        <section id="films" className="section-shell bg-gradient-to-b from-black/0 to-blood/10">
          <SectionHeading eyebrow="Featured Films" title="Recent Projects" />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {films.map((film) => (
              <FadeUp key={film.title}>
                <motion.article whileHover={{ y: -6, scale: 1.02 }} className="modern-card bento-card group h-full p-6">
                  <div className="mb-5 h-40 rounded-lg bg-gradient-to-br from-blood/40 to-black/80 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <p className="font-display text-xs uppercase tracking-[0.3em] text-ember">{film.type}</p>
                  <h3 className="mt-2 font-display text-2xl uppercase text-white">{film.title}</h3>
                  <p className="mt-2 text-slate-400">{film.year}</p>
                </motion.article>
              </FadeUp>
            ))}
          </div>
        </section>

        <section id="services" className="section-shell">
          <SectionHeading eyebrow="Services" title="Production Capabilities" />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {services.map((service) => (
              <FadeUp key={service}>
                <motion.div whileHover={{ scale: 1.03 }} className="service-chip bento-card"><span>{service}</span></motion.div>
              </FadeUp>
            ))}
          </div>
        </section>

        <section id="team" className="section-shell bg-gradient-to-b from-blood/5 to-black">
          <SectionHeading eyebrow="Creative Collective" title="The Team" />
          <div className="mx-auto grid w-[92%] max-w-6xl gap-6 md:grid-cols-3">
            {team.map((member) => (
              <FadeUp key={member.name}>
                <motion.div whileHover={{ y: -4, scale: 1.01 }} className="modern-card p-6">
                  <h3 className="font-display text-2xl uppercase text-white">{member.name}</h3>
                  <p className="mt-3 text-slate-300">{member.role}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </section>

        <section id="portfolio" className="section-shell">
          <SectionHeading eyebrow="Portfolio" title="Cinematic Gallery" subtitle="Hover each frame to reveal a subtle preview glow and motion lift." />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {gallery.map((item, idx) => (
              <FadeUp key={item}>
                <motion.div whileHover={{ scale: 1.03, y: -4 }} className="portfolio-card bento-card group">
                  <div className="h-52 rounded-lg bg-gradient-to-tr from-black to-blood/60 transition-all duration-500 group-hover:from-blood/30 group-hover:to-black" />
                  <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">{item}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Scene {idx + 1}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </section>

        <section id="contact" className="section-shell pb-28">
          <SectionHeading eyebrow="Contact" title="Let's Build The Next Story" />
          <FadeUp className="modern-card mx-auto w-[92%] max-w-3xl p-8 text-center">
            <p className="text-base text-slate-300">Email: invisionfilms21@gmail.com</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a className="btn-secondary" href="https://instagram.com/invision.films" target="_blank" rel="noreferrer">Instagram</a>
              <a className="btn-secondary" href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
              <a className="btn-secondary" href="mailto:invisionfilms21@gmail.com">Email Us</a>
            </div>
          </FadeUp>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-slate-300">INVISION FILMS PRODUCTIONS • SAME INTEREST. SAME VISION.</p>
      </footer>
    </div>
  )
}
