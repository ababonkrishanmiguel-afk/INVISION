import React, { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from 'framer-motion'
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
  { title: 'Red Frame', type: 'Narrative Short', year: '2025', mood: 'Visceral / Noir' },
  { title: 'Afterlight', type: 'Music Video', year: '2024', mood: 'Rhythmic / Atmospheric' },
  { title: 'Pulse of Manila', type: 'Event Film', year: '2024', mood: 'Dynamic / Documentary' },
  { title: 'Silent Orbit', type: 'Branded Film', year: '2023', mood: 'Minimal / Emotional' }
]

const team = [
  { name: 'Creative Direction', role: 'Narrative architecture, visual identity, emotional tone.' },
  { name: 'Cinematography', role: 'Lens language, movement, texture, and light orchestration.' },
  { name: 'Post Production', role: 'Edit pacing, grading, sound layering, and final polish.' }
]

const gallery = [
  { name: 'Noir Lens Study', tag: 'Storyframe 01' },
  { name: 'Human Pulse', tag: 'Storyframe 02' },
  { name: 'Burning Silence', tag: 'Storyframe 03' },
  { name: 'City Echo', tag: 'Storyframe 04' },
  { name: 'Final Light', tag: 'Storyframe 05' },
  { name: 'Origin Cut', tag: 'Storyframe 06' }
]

function IntroSequence({ done }) {
  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          className="intro-layer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } }}
        >
          <div className="intro-beam" />
          <motion.img
            src="/invision_logo_transparent.png"
            alt="INVISION logo"
            className="intro-logo"
            initial={{ opacity: 0, scale: 0.82, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.h1
            className="intro-wordmark"
            initial={{ opacity: 0, letterSpacing: '0.5em', y: 18 }}
            animate={{ opacity: 1, letterSpacing: '0.18em', y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            INVISION FILMS PRODUCTIONS
          </motion.h1>
          <motion.div
            className="intro-noise-sweep"
            initial={{ x: '-120%' }}
            animate={{ x: '130%' }}
            transition={{ duration: 2.4, ease: 'easeInOut', delay: 0.15 }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function AmbientDust() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: `${(i * 13.7) % 100}%`,
        delay: (i * 0.21) % 3,
        duration: 5 + (i % 7)
      })),
    []
  )

  return (
    <div className="dust-wrap" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`
          }}
        />
      ))}
    </div>
  )
}

function FilmSection({ id, children, className = '' }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 42, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`scene-block ${className}`}
    >
      {children}
    </motion.section>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const { scrollYProgress, scrollY } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const heroParallax = useTransform(scrollY, [0, 900], [0, -120])
  const auraX = useSpring(mouse.x, { stiffness: 80, damping: 20 })
  const auraY = useSpring(mouse.y, { stiffness: 80, damping: 20 })
  const auraTx = useTransform(auraX, [0, 1], [-120, 120])
  const auraTy = useTransform(auraY, [0, 1], [-80, 80])

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 3600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className="cinema-root"
      onMouseMove={(e) => {
        const x = e.clientX / window.innerWidth
        const y = e.clientY / window.innerHeight
        setMouse({ x, y })
      }}
    >
      <IntroSequence done={introDone} />

      <motion.div className="scroll-progress" style={{ scaleX: progress, transformOrigin: '0% 50%' }} />
      <AmbientDust />
      <div className="grain-overlay" />

      <div className="video-stage" aria-hidden="true">
        <video className="cinema-video" autoPlay muted loop playsInline preload="auto">
          <source src="/invision-logo-bg.mp4" type="video/mp4" />
        </video>
        <div className="video-vignette" />
      </div>

      <header className="floating-nav-wrap">
        <nav className="floating-nav">
          <a href="#hero" className="brand-anchor">
            <img src="/invision_logo_transparent.png" alt="INVISION logo" className="brand-nav-logo" />
            <span>INVISION</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#films">Films</a>
            <a href="#services">Services</a>
            <a href="#team">Team</a>
            <a href="#portfolio">Portfolio</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero-scene">
          <motion.div className="hero-aura" style={{ x: auraTx, y: auraTy }} />
          <motion.div className="hero-inner" style={{ y: heroParallax }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="hero-logo-shell"
            >
              <img src="/invision_logo_transparent.png" alt="INVISION logo" className="hero-logo-img" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.45 }}
              className="hero-copy"
            >
              <p className="eyebrow">Independent Production Studio</p>
              <h1>INVISION FILMS PRODUCTIONS</h1>
              <p className="tagline">Same Interest. Same Vision.</p>
              <p className="subline">
                Cinematic stories, multimedia production, and creative visuals built with passion.
              </p>
              <div className="hero-actions">
                <a href="#portfolio" className="btn-primary">View Portfolio</a>
                <a href="#contact" className="btn-secondary">Start A Project</a>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <FilmSection id="about">
          <SectionHeading
            eyebrow="About Invision"
            title="A Cinematic Universe, Not Just A Portfolio"
            subtitle="We shape emotional momentum through narrative, light, rhythm, and atmosphere."
          />
          <div className="scene-panel">
            <p>
              INVISION Films Productions creates visual experiences designed like cinema: each frame intentional, each
              movement meaningful, each transition emotional. We orchestrate story from concept to final grade with
              discipline, daring, and crafted mood.
            </p>
          </div>
        </FilmSection>

        <FilmSection id="films">
          <SectionHeading eyebrow="Featured Films" title="Current Film Chapters" />
          <div className="bento-grid">
            {films.map((film, index) => (
              <motion.article key={film.title} whileHover={{ y: -8, scale: 1.02 }} className={`bento-card film-card ${index === 0 ? 'film-main' : ''}`}>
                <div className="film-visual" />
                <p className="film-type">{film.type}</p>
                <h3>{film.title}</h3>
                <p className="film-meta">{film.year} • {film.mood}</p>
              </motion.article>
            ))}
          </div>
        </FilmSection>

        <FilmSection id="services">
          <SectionHeading eyebrow="Capabilities" title="Production Systems" />
          <div className="service-grid">
            {services.map((service) => (
              <motion.div key={service} whileHover={{ y: -6 }} className="service-chip">
                {service}
              </motion.div>
            ))}
          </div>
        </FilmSection>

        <FilmSection id="team">
          <SectionHeading eyebrow="Creative Collective" title="Built By Filmmakers" />
          <div className="team-grid">
            {team.map((member) => (
              <motion.div key={member.name} whileHover={{ scale: 1.02 }} className="team-card">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </motion.div>
            ))}
          </div>
        </FilmSection>

        <FilmSection id="portfolio">
          <SectionHeading eyebrow="Portfolio" title="Cinematic Frames" />
          <div className="portfolio-grid">
            {gallery.map((item, idx) => (
              <motion.div key={item.name} whileHover={{ y: -8, scale: 1.02 }} className={`portfolio-card ${idx === 2 ? 'portfolio-wide' : ''}`}>
                <div className="portfolio-visual" />
                <h3>{item.name}</h3>
                <p>{item.tag}</p>
              </motion.div>
            ))}
          </div>
        </FilmSection>

        <FilmSection id="contact" className="contact-scene">
          <SectionHeading eyebrow="Contact" title="Let’s Build The Next Story" />
          <motion.div whileHover={{ scale: 1.01 }} className="contact-card">
            <p>Email: invisionfilms21@gmail.com</p>
            <div className="contact-links">
              <a href="https://instagram.com/invision.films" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
              <a href="mailto:invisionfilms21@gmail.com">Email Us</a>
            </div>
          </motion.div>
        </FilmSection>
      </main>

      <footer className="footer-line">INVISION FILMS PRODUCTIONS • SAME INTEREST. SAME VISION.</footer>
    </div>
  )
}
