import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
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
      initial={{ opacity: 0, y: 34, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1.01 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ZoomSection({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0.6, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  )
}

function HeroIllustration() {
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  return (
    <div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setPointer({ x, y })
      }}
      className="hero-illustration"
    >
      <motion.div className="hero-layer hero-layer-a" animate={{ x: pointer.x * 12, y: pointer.y * 12 }} transition={{ type: 'spring', stiffness: 70, damping: 20 }} />
      <motion.div className="hero-layer hero-layer-b" animate={{ x: pointer.x * -16, y: pointer.y * -14 }} transition={{ type: 'spring', stiffness: 65, damping: 18 }} />
      <motion.div className="hero-layer hero-layer-c" animate={{ x: pointer.x * 22, y: pointer.y * -18 }} transition={{ type: 'spring', stiffness: 60, damping: 16 }} />
      <div className="hero-story">
        <p>From concept and script to camera and final grade, every frame serves a feeling.</p>
      </div>
    </div>
  )
}

function CinematicVideoBg() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 1400, 2200], [0.9, 0.75, 0])

  return (
    <motion.div style={{ opacity }} className="cinematic-video-wrap" aria-hidden="true">
      <video
        className="cinematic-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="invision-video-poster.jpg"
      >
        <source src="invision-logo-bg.mp4" type="video/mp4" />
      </video>
      <div className="cinematic-video-vignette" />
    </motion.div>
  )
}

export default function App() {
  const [logoMissing, setLogoMissing] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-smoke">
      <CinematicVideoBg />

      {showIntro ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="intro-overlay"
        >
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="intro-ring"
          />
          <motion.h1
            initial={{ letterSpacing: '0.45em', opacity: 0, y: 24 }}
            animate={{ letterSpacing: '0.2em', opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="intro-title"
          >
            INVISION
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="intro-sub"
          >
            FILMS PRODUCTIONS
          </motion.p>
        </motion.div>
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
        <ZoomSection id="hero" className="relative flex min-h-screen items-center">
          <div className="hero-gradient absolute inset-0" />
          <HeroIllustration />
          <img
            src="invision-banner.jpg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="mx-auto grid w-[92%] max-w-6xl items-center gap-10 py-28 lg:grid-cols-[1.1fr_1fr]">
            <motion.div
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-[360px] lg:mx-0"
            >
              {!logoMissing ? (
                <img
                  src="invision-logo.png"
                  alt="INVISION logo"
                  onError={() => setLogoMissing(true)}
                className="logo-image w-full rounded-full border border-blood/40"
              />
              ) : (
                <div className="fallback-logo">
                  <span>INVISION</span>
                </div>
              )}
            </motion.div>
            <div className="relative">
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="mb-2 font-display text-xs uppercase tracking-[0.45em] text-ember"
              >
                Independent Production Studio
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.95 }}
                className="font-display text-5xl uppercase leading-[0.95] text-white md:text-7xl"
              >
                INVISION Films Productions
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.8 }}
                className="mt-5 text-xl text-slate-200"
              >
                Same Interest. Same Vision.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.8 }}
                className="mt-4 max-w-xl text-slate-300"
              >
                Cinematic stories, multimedia production, and creative visuals built with passion.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.8 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <a href="#portfolio" className="btn-primary">View Portfolio</a>
                <a href="#contact" className="btn-secondary">Start a Project</a>
              </motion.div>
            </div>
          </div>
        </ZoomSection>

        <ZoomSection id="about" className="section-shell">
          <SectionHeading
            eyebrow="About Invision"
            title="Bold Visual Storytelling"
            subtitle="INVISION is a creative production collective focused on cinematic emotion, disciplined craft, and meaningful narrative."
          />
          <FadeUp className="mx-auto max-w-4xl text-center text-base leading-relaxed text-slate-300">
            We create films and multimedia work that blend mood, movement, and message. From pre-production planning to post-production finishing, our process is collaborative and intentional, built to shape stories that stay with audiences.
          </FadeUp>
        </ZoomSection>

        <ZoomSection id="films" className="section-shell bg-gradient-to-b from-black/0 to-blood/10">
          <SectionHeading eyebrow="Featured Films" title="Recent Projects" />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {films.map((film, idx) => (
              <FadeUp key={film.title} className={`h-full ${idx === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <motion.article
                  whileHover={{ y: -8, scale: 1.02, rotateX: 2, rotateY: -2 }}
                  transition={{ duration: 0.3 }}
                  className="modern-card bento-card group h-full p-6"
                >
                  <div className="mb-5 h-40 rounded-lg bg-gradient-to-br from-blood/40 to-black/80 transition-transform duration-500 group-hover:scale-[1.02]" />
                  <p className="font-display text-xs uppercase tracking-[0.3em] text-ember">{film.type}</p>
                  <h3 className="mt-2 font-display text-2xl uppercase text-white">{film.title}</h3>
                  <p className="mt-2 text-slate-400">{film.year}</p>
                  <p className="mt-4 inline-block border-b border-ember pb-1 text-xs uppercase tracking-[0.2em] text-ember">
                    Project {String(idx + 1).padStart(2, '0')}
                  </p>
                </motion.article>
              </FadeUp>
            ))}
            <FadeUp className="md:col-span-2">
              <motion.article whileHover={{ scale: 1.01, y: -4 }} className="modern-card bento-card h-full p-6">
                <p className="font-display text-xs uppercase tracking-[0.32em] text-ember">Narrative DNA</p>
                <h3 className="mt-3 font-display text-3xl uppercase text-white">Cinematic stories with emotional momentum</h3>
                <p className="mt-4 max-w-2xl text-slate-300">
                  We blend documentary honesty with stylized visual language, designing each project as a layered journey: hook, pulse, and payoff.
                </p>
              </motion.article>
            </FadeUp>
          </div>
        </ZoomSection>

        <ZoomSection id="services" className="section-shell">
          <SectionHeading eyebrow="Services" title="Production Capabilities" />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {services.map((service) => (
              <FadeUp key={service}>
                <motion.div whileHover={{ scale: 1.03, y: -3 }} className="service-chip bento-card">
                  <span>{service}</span>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </ZoomSection>

        <ZoomSection id="team" className="section-shell bg-gradient-to-b from-blood/5 to-black">
          <SectionHeading eyebrow="Creative Collective" title="The Team" />
          <div className="mx-auto grid w-[92%] max-w-6xl gap-6 md:grid-cols-3">
            {team.map((member) => (
              <FadeUp key={member.name}>
                <motion.div whileHover={{ y: -5, scale: 1.015 }} className="modern-card p-6">
                  <h3 className="font-display text-2xl uppercase text-white">{member.name}</h3>
                  <p className="mt-3 text-slate-300">{member.role}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </ZoomSection>

        <ZoomSection id="portfolio" className="section-shell">
          <SectionHeading eyebrow="Portfolio" title="Cinematic Gallery" subtitle="Hover each frame to reveal a subtle preview glow and motion lift." />
          <div className="bento-grid mx-auto w-[92%] max-w-6xl">
            {gallery.map((item, idx) => (
              <FadeUp key={item} className={idx === 2 ? 'md:col-span-2' : ''}>
                <motion.div whileHover={{ scale: 1.03, y: -4 }} className="portfolio-card bento-card group">
                  <div className="h-52 rounded-lg bg-gradient-to-tr from-black to-blood/60 transition-all duration-500 group-hover:from-blood/30 group-hover:to-black" />
                  <p className="mt-4 font-display text-lg uppercase tracking-wide text-white">{item}</p>
                  <p className="text-xs uppercase tracking-[0.22em] text-slate-300">Scene {idx + 1}</p>
                </motion.div>
              </FadeUp>
            ))}
          </div>
        </ZoomSection>

        <ZoomSection id="contact" className="section-shell pb-28">
          <SectionHeading eyebrow="Contact" title="Let’s Build The Next Story" />
          <FadeUp className="modern-card mx-auto w-[92%] max-w-3xl p-8 text-center">
            <p className="text-base text-slate-300">Email: invisionfilms21@gmail.com</p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
              <a className="btn-secondary" href="https://instagram.com/invision.films" target="_blank" rel="noreferrer">Instagram</a>
              <a className="btn-secondary" href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
              <a className="btn-secondary" href="mailto:invisionfilms21@gmail.com">Email Us</a>
            </div>
          </FadeUp>
        </ZoomSection>
      </main>

      <footer className="border-t border-white/10 py-8 text-center">
        <p className="font-display text-xs uppercase tracking-[0.25em] text-slate-300">
          INVISION FILMS PRODUCTIONS • SAME INTEREST. SAME VISION.
        </p>
      </footer>
    </div>
  )
}
