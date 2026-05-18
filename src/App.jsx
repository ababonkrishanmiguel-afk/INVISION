import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from './components/SectionHeading'

const chapters = [
  {
    title: 'Merese',
    chapter: 'Chapter I',
    year: '2026',
    genre: 'Drama / Memory',
    logline: 'A cinematic study of memory, absence, and the language of what remains unspoken.',
    aura: 'aura-merese'
  },
  {
    title: 'Somnium',
    chapter: 'Chapter II',
    year: '2026',
    genre: 'Psychological / Poetic',
    logline: 'A drifting meditation where dream logic and waking guilt fold into one quiet unraveling.',
    aura: 'aura-somnium'
  },
  {
    title: 'Taphaw',
    chapter: 'Chapter III',
    year: '2026',
    genre: 'Cebuano / Grounded Drama',
    logline: 'A grounded Cebuano chapter about tension, inheritance, and dignity under pressure.',
    aura: 'aura-taphaw'
  }
]

const awards = [
  {
    film: 'Merese',
    items: ['Best Short Film Placeholder', 'Official Selection Placeholder']
  },
  {
    film: 'Somnium',
    items: ['Best Cinematography Placeholder', 'Jury Mention Placeholder']
  },
  {
    film: 'Taphaw',
    items: ['Best Direction Placeholder', 'Regional Film Festival Placeholder']
  }
]

const frames = [
  'Ashes in Light',
  'Window of Silence',
  'Liminal Hallway',
  'Night Geometry',
  'Beneath Neon Rain',
  'The Last Breath'
]

const language = [
  'Short Film Direction',
  'Screenwriting and Story Development',
  'Cinematography',
  'Editing and Color',
  'Sound and Atmosphere',
  'Festival Preparation'
]

function IntroSequence({ phase }) {
  if (phase === 'done') return null

  return (
    <motion.div
      className={`intro-sequence ${phase === 'black' ? 'is-black' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 'black' ? 1 : 1 }}
      exit={{ opacity: 0 }}
    >
      {phase !== 'black' ? (
        <>
          <motion.img
            src="/invision_logo_transparent.png"
            alt="INVISION FILMS logo intro"
            className="intro-logo"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            className="intro-caption"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.65 }}
          >
            TURNING PERSPECTIVES INTO MOTION.
          </motion.p>
          <motion.div className="intro-spot" animate={{ opacity: [0.22, 0.4, 0.28] }} transition={{ duration: 2.2, repeat: Infinity }} />
        </>
      ) : null}
    </motion.div>
  )
}

function FilmChapter({ chapter, idx }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const cardY = useTransform(scrollYProgress, [0, 1], [60, -60])
  const cardZ = useTransform(scrollYProgress, [0, 0.5, 1], [-20, 15, -10])
  const cardRotateY = useTransform(scrollYProgress, [0, 0.5, 1], [-7, 0, 6])
  const textY = useTransform(scrollYProgress, [0, 1], [42, -22])
  const textOpacity = useTransform(scrollYProgress, [0.15, 0.45, 0.86], [0.35, 1, 0.55])

  return (
    <section ref={ref} className={`film-chapter ${chapter.aura}`}>
      <div className="film-sticky">
        <motion.div
          className="film-frame-shell"
          style={{
            y: cardY,
            rotateY: cardRotateY,
            transformPerspective: 1200,
            z: cardZ
          }}
        >
          <div className="film-frame-card">
            <div className="film-frame-light" />
            <span className="film-frame-mark">{chapter.chapter}</span>
            <strong>{chapter.title}</strong>
          </div>
        </motion.div>
        <motion.article className="film-text" style={{ y: textY, opacity: textOpacity }}>
          <p className="film-meta">
            {chapter.year} • {chapter.genre}
          </p>
          <h3>{chapter.title}</h3>
          <p>{chapter.logline}</p>
          <div className="film-award-mini">Awards Placeholder • Scene {String(idx + 1).padStart(2, '0')}</div>
        </motion.article>
      </div>
    </section>
  )
}

function FramesCarousel() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const trackX = useTransform(scrollYProgress, [0, 1], ['8%', '-40%'])
  const trackRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '-2deg'])

  return (
    <section id="frames" ref={ref} className="frames-scene">
      <SectionHeading
        eyebrow="Frames"
        title="Cinematic Frames"
        subtitle="Floating stills from a moving film world."
      />
      <div className="frames-sticky-wrap">
        <motion.div className="frames-track" style={{ x: trackX, rotate: trackRotate }}>
          {frames.map((frame, idx) => (
            <motion.figure
              key={frame}
              className={`frame-item ${idx % 2 === 0 ? 'frame-up' : 'frame-down'}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.65, delay: idx * 0.05 }}
              whileHover={{ rotateY: idx % 2 === 0 ? 7 : -7, rotateX: 4, scale: 1.03 }}
            >
              <div className="frame-visual" />
              <figcaption>
                <h4>{frame}</h4>
                <p>Frame {String(idx + 1).padStart(2, '0')}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default function App() {
  const [introPhase, setIntroPhase] = useState('reveal')
  const { scrollY } = useScroll()
  const heroDepthY = useTransform(scrollY, [0, 1000], [0, -85])
  const logoDepth = useTransform(scrollY, [0, 700], [0, -24])

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.08,
      smoothWheel: true,
      touchMultiplier: 1.15
    })

    let rafId
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    const pauseTimer = setTimeout(() => setIntroPhase('pause'), 1200)
    const blackTimer = setTimeout(() => setIntroPhase('black'), 2350)
    const doneTimer = setTimeout(() => setIntroPhase('done'), 3050)

    return () => {
      clearTimeout(pauseTimer)
      clearTimeout(blackTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div className="cinematic-root">
      <IntroSequence phase={introPhase} />
      <div className="grain-layer" />
      <div className="bg-video-wrap">
        <video className="bg-video" autoPlay muted loop playsInline preload="auto">
          <source src="/invision-logo-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <header className="top-nav-wrap">
        <nav className="top-nav">
          <a href="#hero" className="brand-anchor">
            <img src="/invision_logo_transparent.png" alt="INVISION FILMS logo" />
            <span>INVISION FILMS</span>
          </a>
          <div className="top-links">
            <a href="#about">About</a>
            <a href="#films">Films</a>
            <a href="#frames">Frames</a>
            <a href="#team">Team</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero-scene">
          <motion.div className="hero-depth-layer" style={{ y: heroDepthY }}>
            <motion.img
              src="/invision_logo_transparent.png"
              alt="INVISION FILMS logo"
              className="hero-logo"
              style={{ y: logoDepth }}
              initial={{ opacity: 0, scale: 0.84 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, delay: 0.15 }}
            />
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
            >
              INVISION FILMS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42 }}
            >
              Turning Perspectives into Motion.
            </motion.p>
          </motion.div>
        </section>

        <section id="about" className="content-section">
          <SectionHeading
            eyebrow="About"
            title="Dark, Minimal, Cinematic Storytelling"
            subtitle="An indie film studio shaped by atmosphere, silence, and visual restraint."
          />
          <div className="about-glass">
            INVISION FILMS builds short films with a cinematic grammar rooted in depth, perspective, and emotional
            rhythm. Each scene is designed as an experience, not a template.
          </div>
        </section>

        <section id="films" className="chapters-section">
          <SectionHeading
            eyebrow="Films"
            title="Film Chapters"
            subtitle="Scroll through three immersive chapter scenes."
          />
          {chapters.map((chapter, idx) => (
            <FilmChapter key={chapter.title} chapter={chapter} idx={idx} />
          ))}
        </section>

        <section className="content-section awards-section">
          <SectionHeading
            eyebrow="Awards"
            title="Awards & Recognition"
            subtitle="Placeholder laurels and recognitions presented as cinematic plaques."
          />
          <div className="awards-grid">
            {awards.map((group, idx) => (
              <motion.article
                key={group.film}
                className="award-plaque"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.62, delay: idx * 0.08 }}
                whileHover={{ rotateY: idx % 2 === 0 ? 6 : -6, rotateX: 4, scale: 1.02 }}
              >
                <h3>{group.film}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <FramesCarousel />

        <section className="content-section">
          <SectionHeading
            eyebrow="Our Film Language"
            title="How We Shape Films"
            subtitle="A focused cinematic process with no generic service clutter."
          />
          <div className="language-grid">
            {language.map((item) => (
              <motion.div
                key={item}
                className="language-item"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.24 }}
                transition={{ duration: 0.52 }}
              >
                {item}
              </motion.div>
            ))}
          </div>
        </section>

        <section id="team" className="content-section">
          <SectionHeading
            eyebrow="Team"
            title="A Focused Film Collective"
            subtitle="Direction, cinematography, and post-production under one cinematic vision."
          />
          <div className="team-grid">
            <article>
              <h3>Direction</h3>
              <p>Story architecture, emotional flow, and chapter design.</p>
            </article>
            <article>
              <h3>Cinematography</h3>
              <p>Lens language, motion perspective, and visual depth control.</p>
            </article>
            <article>
              <h3>Post</h3>
              <p>Editorial rhythm, grading atmosphere, and sonic texture.</p>
            </article>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>INVISION FILMS</p>
        <a href="mailto:invisionfilms21@gmail.com">invisionfilms21@gmail.com</a>
      </footer>
    </div>
  )
}
