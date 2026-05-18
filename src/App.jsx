import React, { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from './components/SectionHeading'

const chapters = [
  {
    title: 'Hulagway',
    year: '2026',
    genre: 'Drama / Memory',
    logline:
      'A quiet short film about memory, distance, and the things people leave unsaid.'
  },
  {
    title: 'Sa Daplin',
    year: '2026',
    genre: 'Cebuano / Grounded Drama',
    logline:
      'A grounded Cebuano story about waiting, uncertainty, and small choices that change a person.'
  },
  {
    title: 'After the Noise',
    year: '2026',
    genre: 'Reflective / Human Drama',
    logline:
      'A reflective short film about silence after conflict and the emotional weight of moving forward.'
  }
]

const frames = [
  'First Light',
  'Between Rooms',
  'Night Crossing',
  'Dust and Neon',
  'Still Breath',
  'Last Echo'
]

const filmLanguage = [
  'Short Film Direction',
  'Screenwriting and Story Development',
  'Cinematography',
  'Editing and Color',
  'Sound and Atmosphere',
  'Film Festival Preparation'
]

function Intro({ done }) {
  return done ? null : (
    <motion.div
      className="intro-layer"
      initial={{ opacity: 1 }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.img
        src="/invision_logo_transparent.png"
        alt="INVISION FILMS logo"
        className="intro-logo"
        initial={{ opacity: 0, scale: 0.88 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="intro-line"
      >
        TURNING PERSPECTIVES INTO MOTION.
      </motion.p>
    </motion.div>
  )
}

function FilmChapter({ chapter, index }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const mediaY = useTransform(scrollYProgress, [0, 1], [38, -38])
  const textY = useTransform(scrollYProgress, [0, 1], [54, -24])
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.45, 0.8], [0.35, 1, 0.5])

  return (
    <section ref={ref} className={`chapter chapter-${index + 1}`}>
      <div className="chapter-sticky">
        <motion.div className="chapter-media-wrap" style={{ y: mediaY }}>
          <div className="chapter-media">
            <span>FRAME {String(index + 1).padStart(2, '0')}</span>
          </div>
        </motion.div>
        <motion.article className="chapter-copy" style={{ y: textY, opacity: textOpacity }}>
          <p className="chapter-meta">
            {chapter.year} • {chapter.genre}
          </p>
          <h3>{chapter.title}</h3>
          <p className="chapter-logline">{chapter.logline}</p>
        </motion.article>
      </div>
    </section>
  )
}

function FramesRail() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  const x = useTransform(scrollYProgress, [0, 1], ['6%', '-36%'])

  return (
    <section id="frames" ref={ref} className="frames-section">
      <SectionHeading
        eyebrow="Frames"
        title="Moments Between Dialogue"
        subtitle="A curated sequence of stills that feel like pages from a living film reel."
      />
      <div className="frames-mask">
        <motion.div className="frames-track" style={{ x }}>
          {frames.map((frame, idx) => (
            <motion.figure
              key={frame}
              className="frame-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: idx * 0.04 }}
            >
              <div className="frame-visual" />
              <figcaption>
                <h4>{frame}</h4>
                <p>Still {String(idx + 1).padStart(2, '0')}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function App() {
  const [introDone, setIntroDone] = useState(false)
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 900], [0, -70])

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 2600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="site-shell">
      <Intro done={introDone} />
      <div className="film-noise" />
      <div className="film-bg">
        <video className="film-video" autoPlay muted loop playsInline preload="auto">
          <source src="/invision-logo-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <header className="nav-wrap">
        <nav className="nav">
          <a href="#hero" className="brand">
            <img src="/invision_logo_transparent.png" alt="INVISION FILMS logo" />
            <span>INVISION FILMS</span>
          </a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#films">Films</a>
            <a href="#frames">Frames</a>
            <a href="#team">Team</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero">
          <motion.div className="hero-layer" style={{ y: heroParallax }}>
            <img src="/invision_logo_transparent.png" alt="INVISION FILMS logo" className="hero-logo" />
            <h1>INVISION FILMS</h1>
            <p>Turning Perspectives into Motion.</p>
          </motion.div>
        </section>

        <section id="about" className="section-block">
          <SectionHeading
            eyebrow="About"
            title="A Quiet, Cinematic Studio"
            subtitle="We shape films with restraint, atmosphere, and emotional precision."
          />
          <div className="about-panel">
            <p>
              INVISION FILMS crafts short-form cinema rooted in human tension, memory, silence, and movement. Our
              process prioritizes narrative honesty, visual language, and immersive atmosphere over spectacle.
            </p>
          </div>
        </section>

        <section id="films" className="films-section">
          <SectionHeading
            eyebrow="Films"
            title="Film Chapters"
            subtitle="Scroll through three chaptered scenes designed as a cinematic progression."
          />
          {chapters.map((chapter, index) => (
            <FilmChapter key={chapter.title} chapter={chapter} index={index} />
          ))}
        </section>

        <FramesRail />

        <section className="section-block">
          <SectionHeading
            eyebrow="How We Shape Films"
            title="Our Film Language"
            subtitle="A focused production language built for cinematic storytelling."
          />
          <div className="language-grid">
            {filmLanguage.map((item) => (
              <motion.div
                key={item}
                className="language-chip"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="team" className="section-block">
          <SectionHeading
            eyebrow="Team"
            title="Built by Story-Driven Filmmakers"
            subtitle="A small collective focused on direction, cinematography, and post-production craft."
          />
          <div className="team-grid">
            <article>
              <h3>Direction</h3>
              <p>Story architecture, emotional pacing, and cinematic intent.</p>
            </article>
            <article>
              <h3>Cinematography</h3>
              <p>Frame composition, lens language, movement, and texture.</p>
            </article>
            <article>
              <h3>Post</h3>
              <p>Editing rhythm, color shaping, and atmospheric sonic detail.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>INVISION FILMS</p>
        <a href="mailto:invisionfilms21@gmail.com">invisionfilms21@gmail.com</a>
      </footer>
    </div>
  )
}
