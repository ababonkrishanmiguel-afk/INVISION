import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion'
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
          <motion.div
            className="intro-ray"
            initial={{ x: '-130%', opacity: 0 }}
            animate={{ x: '140%', opacity: [0, 0.34, 0] }}
            transition={{ duration: 2.6, ease: 'easeInOut', delay: 0.2 }}
          />
          <motion.img
            src="/invision_logo_transparent.png"
            alt="INVISION FILMS logo intro"
            className="intro-logo intro-logo-distort"
            initial={{ opacity: 0, scale: 0.7, rotate: -20, x: -14, y: 8 }}
            animate={{
              opacity: [0, 1, 1],
              scale: [0.7, 1.12, 0.98],
              rotate: [-20, 8, 0],
              x: [-14, 12, 0],
              y: [8, -7, 0]
            }}
            transition={{ duration: 3.1, ease: [0.22, 1, 0.36, 1] }}
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
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const parallaxX = useMotionValue(0)
  const parallaxY = useMotionValue(0)
  const tiltXSmooth = useSpring(tiltX, { stiffness: 150, damping: 18 })
  const tiltYSmooth = useSpring(tiltY, { stiffness: 150, damping: 18 })
  const parallaxXSmooth = useSpring(parallaxX, { stiffness: 120, damping: 20 })
  const parallaxYSmooth = useSpring(parallaxY, { stiffness: 120, damping: 20 })
  const blendRotateY = useTransform(() => cardRotateY.get() + tiltYSmooth.get())

  return (
    <section ref={ref} className={`film-chapter ${chapter.aura}`}>
      <div className="film-sticky">
        <motion.div
          className="film-frame-shell"
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const px = (e.clientX - rect.left) / rect.width - 0.5
            const py = (e.clientY - rect.top) / rect.height - 0.5
            tiltX.set(py * -8)
            tiltY.set(px * 10)
            parallaxX.set(px * 14)
            parallaxY.set(py * 14)
          }}
          onMouseLeave={() => {
            tiltX.set(0)
            tiltY.set(0)
            parallaxX.set(0)
            parallaxY.set(0)
          }}
          style={{
            y: cardY,
            rotateY: blendRotateY,
            rotateX: tiltXSmooth,
            transformPerspective: 1200,
            z: cardZ
          }}
        >
          <motion.div className="film-frame-card">
            <div className="film-frame-light" />
            <span className="film-frame-mark">{chapter.chapter}</span>
            <strong>{chapter.title}</strong>
            <motion.div className="film-frame-inner-shift" style={{ x: parallaxXSmooth, y: parallaxYSmooth }} />
          </motion.div>
        </motion.div>
        <motion.article className="film-text" style={{ y: textY, opacity: textOpacity }}>
          <p className="film-meta">
            {chapter.year} | {chapter.genre}
          </p>
          <h3>{chapter.title}</h3>
          <p>{chapter.logline}</p>
          <div className="film-award-mini">Awards Placeholder | Scene {String(idx + 1).padStart(2, '0')}</div>
        </motion.article>
      </div>
    </section>
  )
}

function FramesCarousel() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const topX = useTransform(scrollYProgress, [0, 1], ['4%', '-28%'])
  const bottomX = useTransform(scrollYProgress, [0, 1], ['-20%', '8%'])
  const topRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '-1.4deg'])
  const bottomRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '1.1deg'])
  const topFrames = frames.slice(0, 3)
  const bottomFrames = frames.slice(3)

  return (
    <section id="frames" ref={ref} className="frames-scene">
      <SectionHeading
        eyebrow="Frames"
        title="Cinematic Frames"
        subtitle="Floating stills from a moving film world."
      />
      <div className="frames-sticky-wrap">
        <motion.div className="frames-track frames-track-top" style={{ x: topX, rotate: topRotate }}>
          {topFrames.map((frame, idx) => (
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
        <motion.div className="frames-track frames-track-bottom" style={{ x: bottomX, rotate: bottomRotate }}>
          {bottomFrames.map((frame, idx) => (
            <motion.figure
              key={frame}
              className={`frame-item ${idx % 2 === 0 ? 'frame-down' : 'frame-up'}`}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.22 }}
              transition={{ duration: 0.65, delay: idx * 0.05 }}
              whileHover={{ rotateY: idx % 2 === 0 ? -7 : 7, rotateX: 4, scale: 1.03 }}
            >
              <div className="frame-visual" />
              <figcaption>
                <h4>{frame}</h4>
                <p>Frame {String(idx + 4).padStart(2, '0')}</p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FilmLanguageMarquee() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const driftLeft = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])
  const driftRight = useTransform(scrollYProgress, [0, 1], ['-6%', '4%'])
  const railItems = [...language, ...language]

  return (
    <section ref={ref} className="content-section language-section">
      <SectionHeading
        eyebrow="Our Film Language"
        title="How We Shape Films"
        subtitle="A cinematic process that moves with story, rhythm, and atmosphere."
      />
      <div className="language-rail-wrap">
        <motion.div className="language-rail auto-left" style={{ x: driftLeft }}>
          {railItems.map((item, idx) => (
            <span key={`${item}-${idx}`}>{item}</span>
          ))}
        </motion.div>
        <motion.div className="language-rail auto-right" style={{ x: driftRight }}>
          {railItems.map((item, idx) => (
            <span key={`${item}-r-${idx}`}>{item}</span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TeamStack() {
  const [activeCard, setActiveCard] = useState(1)

  const stack = [
    {
      id: 0,
      role: 'Direction',
      text: 'Story architecture, emotional pacing, and chapter orchestration.'
    },
    {
      id: 1,
      role: 'Cinematography',
      text: 'Lens language, movement grammar, and atmosphere-first composition.'
    },
    {
      id: 2,
      role: 'Post',
      text: 'Editorial rhythm, color worldbuilding, and sonic depth finishing.'
    }
  ]

  return (
    <section id="team" className="content-section">
      <SectionHeading
        eyebrow="Team"
        title="A Focused Film Collective"
        subtitle="Three core pillars moving as one cinematic unit."
      />
      <div className="team-stack-wrap">
        {stack.map((item, idx) => {
          const isActive = activeCard === idx
          return (
            <motion.article
              key={item.role}
              className={`team-stack-card team-stack-${idx} ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveCard(idx)}
              onClick={() => setActiveCard(idx)}
              whileHover={{ y: -18, rotateX: 3, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            >
              <span>{String(idx + 1).padStart(2, '0')}</span>
              <h3>{item.role}</h3>
              <p>{item.text}</p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}

export default function App() {
  const [introPhase, setIntroPhase] = useState('reveal')
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 22 })
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
    const pauseTimer = setTimeout(() => setIntroPhase('pause'), 2800)
    const blackTimer = setTimeout(() => setIntroPhase('black'), 5000)
    const doneTimer = setTimeout(() => setIntroPhase('done'), 6200)

    return () => {
      clearTimeout(pauseTimer)
      clearTimeout(blackTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  return (
    <div
      className={`cinematic-root ${introPhase !== 'done' ? 'intro-active' : ''}`}
      onMouseMove={(e) => {
        mouseX.set(e.clientX - 170)
        mouseY.set(e.clientY - 170)
      }}
    >
      <IntroSequence phase={introPhase} />
      <motion.div className="cursor-red-glow" style={{ x: glowX, y: glowY }} />
      <div className="grain-layer" />
      <div className="bg-video-wrap">
        <video className="bg-video" autoPlay muted loop playsInline preload="auto">
          <source src="/invision-logo-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <header className={`top-nav-wrap ${introPhase !== 'done' ? 'home-hidden' : 'home-reveal'}`}>
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

      <main className={introPhase !== 'done' ? 'home-hidden' : 'home-reveal'}>
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
              className="hero-title"
            >
              INVISION FILMS
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.42 }}
              className="hero-motto"
            >
              Turning Perspectives into <span>Motion.</span>
            </motion.p>
          </motion.div>
        </section>

        <section id="about" className="content-section">
          <SectionHeading
            eyebrow="About"
            title="From Student Roots to Award-Winning Films"
            subtitle="Founded in 2021 as a student multimedia body, we grew into a team producing award-winning cinematic films."
          />
          <div className="about-glass">
            INVISION FILMS was founded in 2021 as a student multimedia body and rose through persistence, craft, and
            collaboration into producing award-winning films. We stay cinematic, but our visual language adapts to the
            theme, mood, and emotional world of each story.
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

        <FilmLanguageMarquee />
        <TeamStack />
      </main>

      <footer className={`site-footer ${introPhase !== 'done' ? 'home-hidden' : 'home-reveal'}`}>
        <p>INVISION FILMS</p>
        <a href="mailto:invisionfilms21@gmail.com">invisionfilms21@gmail.com</a>
      </footer>
    </div>
  )
}
