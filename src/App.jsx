import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { motion, useMotionTemplate, useMotionValue, useMotionValueEvent, useSpring, useTransform, useScroll } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeading from './components/SectionHeading'

const driveSrc = (id) => `https://drive.google.com/uc?export=view&id=${id}`
const driveIdFromUrl = (url) => {
  if (!url) return ''
  const byPath = url.match(/\/d\/([a-zA-Z0-9_-]+)/)
  if (byPath?.[1]) return byPath[1]
  const byQuery = url.match(/[?&]id=([a-zA-Z0-9_-]+)/)
  if (byQuery?.[1]) return byQuery[1]
  return ''
}

const driveCandidates = (urlOrId) => {
  const id = urlOrId.includes('http') ? driveIdFromUrl(urlOrId) : urlOrId
  if (!id) return [urlOrId]
  return [
    `https://lh3.googleusercontent.com/d/${id}=w1800`,
    `https://drive.google.com/thumbnail?id=${id}&sz=w1800`,
    `https://drive.usercontent.google.com/download?id=${id}&export=view&authuser=0`,
    `https://drive.google.com/uc?export=view&id=${id}`,
    `https://drive.google.com/uc?export=download&id=${id}`
  ]
}

function DriveImage({ src, alt, className }) {
  const candidates = driveCandidates(src)
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setIndex(0)
    setFailed(false)
  }, [src])

  if (failed) return <div className={`${className} image-fallback`} aria-label={alt} />

  return (
    <img
      src={candidates[index]}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        if (index < candidates.length - 1) setIndex((v) => v + 1)
        else setFailed(true)
      }}
    />
  )
}

const aboutContent = {
  title: 'From Cebuano Roots to Award-Winning Films',
  subtitle: 'Founded in 2021 as a Cebuano student multimedia body, we have since evolved into a professional creative team producing award-winning films.',
  body: 'INVISION FILMS was founded in 2021 as a Cebuano student multimedia collective driven by a shared passion for storytelling and filmmaking. Through years of persistence, collaboration, and creative growth, we evolved into a professional team producing award-winning films. We remain rooted in cinematic storytelling, and our visual language adapts to the emotion, atmosphere, and identity of every story we choose to tell.'
}

const chapters = [
  {
    title: 'Merese',
    chapter: 'Chapter I',
    year: '2023',
    genre: 'Comedy',
    logline: 'Five friends join a 48-hour film challenge, but with no script in hand, imagination takes over and reality begins to unravel.',
    aura: 'aura-merese',
    poster: driveSrc('1POrIhcBCBpT0p7hEmUrF-weF1LYMaV7I'),
    awardLine: "DTI's Fiesta Kucha Film Festival 2025 | Best Editing"
  },
  {
    title: 'Somnium',
    chapter: 'Chapter II',
    year: '2025',
    genre: 'Psychological Horror',
    logline: 'At the center is Elaine De Gracia, a student nurse in a Catholic school whose mind quietly unravels as sanity begins to expire.',
    aura: 'aura-somnium',
    poster: driveSrc('1oNOu2PlykdDlNn-ByDzXrVSrpEUkLwNk'),
    awardLine: '3rd University of Wollongong in Dubai | Top 10 Official Selection'
  },
  {
    title: 'Taphaw',
    chapter: 'Chapter III',
    year: '2026',
    genre: 'Drama',
    logline: 'In the quiet of the unseen, Elsie Daayon fights tirelessly for her dreams, climbing through struggle and sacrifice. Can hope guide her to the top?',
    aura: 'aura-taphaw',
    poster: driveSrc('1OhwFBCW1V15OWkTJqapGA40XZMMXhXjH'),
    awardLine: 'Sinulog Film Festival 2026 | Best Film, Best Screenplay, Best Director, Best Cinematography'
  }
]

const awards = [
  {
    film: 'Confusing Roads that Spiraled to Filmmaking',
    items: ['Coming-of-age feature article', 'Cebu Daily News'],
    photo: driveSrc('1Oh8z7OsWPx0w5XCzT4mScPFks8Fg17Zx'),
    article: 'https://cebudailynews.inquirer.net/559343/confusing-roads-that-spiraled-to-filmmaking-a-coming-of-age-journey'
  },
  {
    film: 'Somnium',
    items: ['Top 10 Official Selection', 'UOW Dubai Film Festival 2025'],
    photo: driveSrc('1_8MhVj5teENEZR55sMM_n3tc-9b4RnbP'),
    article: 'https://www.facebook.com/share/p/1DtrereRoa/'
  },
  {
    film: "Taphaw Team's Journey to Success",
    items: ['Sinulog Film Festival 2026 feature', 'Cebu Daily News'],
    photo: driveSrc('11fD0XAtlSV0ZLBREwppkwJACP_fs09nW'),
    article: 'https://cebudailynews.inquirer.net/704942/taphaw-teams-journey-to-success-at-the-sinulog-film-festival-2026?utm_source=dlvr.it&utm_medium=facebook'
  },
  {
    film: 'Taphaw Wins Big',
    items: ['Festival recognition update', 'Instagram feature'],
    photo: driveSrc('1MoQtgPTYixlEUHuw788DWFJ09rlQvqVy'),
    article: 'https://www.instagram.com/p/DVpX6q2jz5u/'
  },
  {
    film: 'Taphaw Top 10 Official Selection',
    items: ['Sinepiyu XVIII Diwa: Sa Lente Ng Katauhan', 'Feature post'],
    photo: driveSrc('1aSSazPHpCMnEn_yk47P2bRsiPAZRPxh2'),
    article: 'https://www.facebook.com/share/p/1CBKjv9DDt/'
  },
  {
    film: 'Taphaw Featured on Sinegang.ph',
    items: ['Official lineup feature', 'Sinepiyu XVIII Diwa'],
    photo: driveSrc('1z1-KcjeuwTs1j-EV7r7kvcO1sdQu8bVT'),
    article: 'https://www.facebook.com/share/p/1H1a3L3ZJN/'
  }
]

const frames = [
  {
    title: 'Where The Sixth Dimension Burns',
    film: '11:11 (2022)',
    image: driveSrc('1crhqiQolAGGtdFK7sCraY4WCg3WelfRc')
  },
  {
    title: 'Waves In A Dream',
    film: 'Specter Dream (2022)',
    image: driveSrc('1Mxsn0UFH6MoZF0A4mqRLXeTjBdk1mg67')
  },
  {
    title: 'It Is What It Is',
    film: 'Merese (2023)',
    image: driveSrc('12yLct-g_yKebVI-SVOhzNE56eDgmt7nb')
  },
  {
    title: 'The Expiration Ritual',
    film: 'Somnium (2025)',
    image: driveSrc('1_W1d_yRlHhQeFdqIf0KqDc9ai1F9mcWd')
  },
  {
    title: 'Heart Of Padayon',
    film: 'Taphaw (2026)',
    image: driveSrc('1Z_pPnp2uied3DpdyKVBxMwuxY_clL1c9')
  },
  {
    title: 'Fragile Corridor',
    film: '1975 (2021)',
    image: driveSrc('1S2Senewo9YubCPs3L78lV8htFvZapQ2T')
  }
]

const language = [
  'Short Film Direction',
  'Screenwriting and Story Development',
  'Cinematography',
  'Editing and Color',
  'Sound and Atmosphere',
  'Festival Preparation'
]

const teamMembers = [
  { name: 'Far Spencer', role: 'Film Director & Producer', photo: driveSrc('1BvqNS7hVta210DoVUuOniYfjYSUxgq84') },
  { name: 'John Lloyd Caramihan', role: 'Production Secretary & Actor', photo: driveSrc('1e3uzy5UlqATC5Ify3B3FR1s-9BNo0O2f') },
  { name: 'Jade Lagasca', role: 'Director of Cinematography & Editor', photo: driveSrc('1HXOKJ6U7GsbMqEA-vnreqKIEtOThz9Fj') },
  { name: 'Denver Hoybia', role: 'Assistant Director & Actor', photo: driveSrc('1drFQkJs_U74Ni2uArCDGHrIjCEI2bomX') },
  { name: 'Cris Vinuya', role: 'Production Designer & Actor', photo: driveSrc('1e3uzy5UlqATC5Ify3B3FR1s-9BNo0O2f') },
  { name: 'Krishan Miguel', role: 'Editor Assist & Web Dev', photo: driveSrc('1dCFr7Ya4KyfjR4aHKNoLnc7DqMIXCjog') },
  { name: 'Ella Sigue', role: 'Sound Recordist & Camera Operator', photo: driveSrc('1F1KKL110WBdHVNWILurqjxH_H8kyXR-J') },
  { name: 'Ken Martinez', role: 'Editor & Assistant Cinematographer', photo: driveSrc('1ebAMwZqvw7OJjp7Nx6qB0Urs9qz5MVpE') },
  { name: 'Christian Josh Baguio', role: 'Photographer & Gaffer', photo: driveSrc('1dTe235j49BYOrB9se6YsnyDxw7W_bRUN') },
  { name: 'Brylle Mande Ocular', role: 'Graphic Designer', photo: driveSrc('1bZMOk0BckWMOaH5C6qyrTgIV2OpFOBef') },
  { name: 'Valerie Demecillo', role: 'Graphic Animator', photo: driveSrc('128uM-cIYogwIFJv59ioRAKOH8ZYgps8n') },
  { name: 'Abby Aparicio', role: 'Actress', photo: driveSrc('1fdmCe9K-7PpEl2U4TrxcCxQdOjvKfOMf') }
]

function IntroSequence({ phase }) {
  const isFading = phase === 'black' || phase === 'done'

  return (
    <motion.div
      className={`intro-sequence ${phase === 'black' || phase === 'done' ? 'is-black' : ''}`}
      initial={false}
      animate={{ opacity: isFading ? 0 : 1 }}
      transition={{ duration: 1.25, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: isFading ? 'none' : 'auto' }}
    >
      <div className="intro-core">
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
          initial={{ opacity: 0, scale: 0.45, rotate: -24, x: -20, y: 12 }}
          animate={{
            opacity: [0, 1, 1],
            scale: [0.45, 1.36, 1.02],
            rotate: [-24, 10, 0],
            x: [-20, 14, 0],
            y: [12, -9, 0]
          }}
          transition={{ duration: 3.1, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.div className="intro-spot" animate={{ opacity: [0.22, 0.4, 0.28] }} transition={{ duration: 2.2, repeat: Infinity }} />
      </div>
    </motion.div>
  )
}

function FilmographySlide({ chapter, index, total, scrollYProgress }) {
  const center = total === 1 ? 0 : index / (total - 1)
  const segment = total > 1 ? 1 / (total - 1) : 1
  const x = useTransform(scrollYProgress, (v) => {
    const d = v - center
    const t = Math.min(Math.abs(d) / (segment * 1.2), 1)
    const eased = Math.pow(t, 1.2)
    if (d < 0) return eased * 420
    return -eased * 380
  })
  const y = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / (segment * 1.15), 1)
    return t * 32
  })
  const rotateZ = useTransform(scrollYProgress, (v) => {
    const d = v - center
    const t = Math.min(Math.abs(d) / (segment * 1.18), 1)
    return (d < 0 ? 1 : -1) * t * 10
  })
  const rotateY = useTransform(scrollYProgress, (v) => {
    const d = v - center
    const t = Math.min(Math.abs(d) / (segment * 1.12), 1)
    return (d < 0 ? -1 : 1) * t * 17
  })
  const scale = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / (segment * 1.16), 1)
    return 1.08 - t * 0.2
  })
  const opacity = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / (segment * 1.14), 1)
    return 1 - t * 0.62
  })
  const z = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / (segment * 1.14), 1)
    return 190 - t * 260
  })
  const blur = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / (segment * 1.16), 1)
    const handoffNorm = segment > 0 ? d / (segment * 0.5) : 0
    const handoffBand = Math.max(0, 1 - Math.abs(handoffNorm - 1) / 0.34)
    return t * 1.8 + handoffBand * 4.8
  })
  const filter = useMotionTemplate`blur(${blur}px)`

  const detailsX = useTransform(scrollYProgress, (v) => {
    const d = v - center
    const t = Math.min(Math.abs(d) / 0.36, 1)
    return d < 0 ? 52 * t : -42 * t
  })
  const detailsY = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / 0.36, 1)
    return 24 * t
  })
  const detailsRotateY = useTransform(scrollYProgress, (v) => {
    const d = v - center
    const t = Math.min(Math.abs(d) / 0.36, 1)
    return (d < 0 ? 1 : -1) * 12 * t
  })
  const detailsScale = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / 0.36, 1)
    return 1 - 0.16 * t
  })
  const detailsOpacity = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / 0.36, 1)
    return 1 - 0.75 * t
  })
  const detailsBlur = useTransform(scrollYProgress, (v) => {
    const d = Math.abs(v - center)
    const t = Math.min(d / (segment * 1.08), 1)
    const handoffNorm = segment > 0 ? d / (segment * 0.5) : 0
    const handoffBand = Math.max(0, 1 - Math.abs(handoffNorm - 1) / 0.38)
    return t * 1.2 + handoffBand * 3.2
  })
  const detailsFilter = useMotionTemplate`blur(${detailsBlur}px)`

  const [awardTitle, awardEvent] = chapter.awardLine.split('|').map((v) => v.trim())
  const cardIndex = total - index

  return (
    <motion.article
      className={`filmography-slide ${chapter.aura}`}
      style={{
        x,
        y,
        z,
        scale,
        rotateZ,
        rotateY,
        opacity,
        filter,
        transformPerspective: 1500,
        zIndex: cardIndex
      }}
    >
      <div className="filmography-poster-shell">
        <div className="filmography-poster-card">
          <DriveImage src={chapter.poster} alt={`${chapter.title} poster`} className="film-frame-poster" />
          <div className="film-frame-light" />
          <span className="film-frame-mark">{chapter.chapter}</span>
        </div>
      </div>

      <motion.div
        className="filmography-detail-shell"
        style={{
          x: detailsX,
          y: detailsY,
          rotateY: detailsRotateY,
          scale: detailsScale,
          opacity: detailsOpacity,
          filter: detailsFilter,
          transformPerspective: 1200
        }}
      >
        <article className="film-text">
          <p className="film-meta">
            {chapter.year} | {chapter.genre}
          </p>
          <h3>{chapter.title}</h3>
          <p>{chapter.logline}</p>
          <div className="film-award-mini">
            <div className="laurette-badge">
              <div className="laurette-wing laurette-wing-left">
                {Array.from({ length: 9 }).map((_, leafIndex) => (
                  <span key={`left-${leafIndex}`} className="laurette-leaf" style={{ '--i': leafIndex }} />
                ))}
              </div>
              <div className="laurette-core">
                <span className="laurette-label">Film Award</span>
                <strong>{awardTitle}</strong>
                <span className="laurette-sub">{chapter.title}</span>
              </div>
              <div className="laurette-wing laurette-wing-right">
                {Array.from({ length: 9 }).map((_, leafIndex) => (
                  <span key={`right-${leafIndex}`} className="laurette-leaf" style={{ '--i': leafIndex }} />
                ))}
              </div>
            </div>
            <p className="film-award-event">{awardEvent}</p>
          </div>
        </article>
      </motion.div>
    </motion.article>
  )
}

function FilmographyShowcase() {
  const ref = useRef(null)
  const progress = useMotionValue(0)
  const [isMobile, setIsMobile] = useState(false)
  const stageRotateX = useTransform(progress, [0, 0.5, 1], [2.5, 0, -2.5])
  const stageRotateY = useTransform(progress, [0, 0.5, 1], [-2.5, 0, 2.5])
  const stageY = useTransform(progress, [0, 1], [10, -10])

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (!ref.current || isMobile) {
      progress.set(0)
      return
    }

    gsap.registerPlugin(ScrollTrigger)
    const section = ref.current
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=2600',
        pin: true,
        scrub: 1.1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          progress.set(self.progress)
        }
      })

      return () => {
        trigger.kill()
      }
    })

    return () => {
      mm.revert()
    }
  }, [isMobile, progress])

  return (
    <section id="films" ref={ref} className="chapters-section filmography-scene">
      <SectionHeading
        eyebrow="INVISION"
        title="FILMOGRAPHY"
        subtitle="Merese, Somnium, and Taphaw - a layered cinematic showcase in motion."
      />
      <div className="filmography-pin-frame">
        <motion.div
          className="filmography-stage"
          style={{ rotateX: stageRotateX, rotateY: stageRotateY, y: stageY, transformPerspective: 1800 }}
        >
          {chapters.map((chapter, idx) => (
            <FilmographySlide
              key={chapter.title}
              chapter={chapter}
              index={idx}
              total={chapters.length}
              scrollYProgress={progress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function FramesCarousel() {
  const ref = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const topX = useTransform(scrollYProgress, [0, 1], ['4%', '-28%'])
  const bottomX = useTransform(scrollYProgress, [0, 1], ['-20%', '8%'])
  const topRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '-1.4deg'])
  const bottomRotate = useTransform(scrollYProgress, [0, 1], ['0deg', '1.1deg'])
  const topFrames = frames.slice(0, 3)
  const bottomFrames = frames.slice(3)

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  return (
    <section id="frames" ref={ref} className="frames-scene">
      <SectionHeading
        eyebrow="Frames"
        title="Cinematic Frames"
        subtitle="Floating stills from a moving film world."
      />
      {isMobile ? (
        <div className="frames-mobile-grid">
          {frames.map((frame, idx) => (
            <motion.figure
              key={frame.title}
              className="frame-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.03 }}
            >
              <div className="frame-visual">
                <DriveImage src={frame.image} alt={frame.title} className="frame-visual-img" />
              </div>
              <figcaption>
                <h4>{frame.title}</h4>
                <p>{frame.film}</p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      ) : (
        <div className="frames-sticky-wrap">
          <motion.div className="frames-track frames-track-top" style={{ x: topX, rotate: topRotate }}>
            {topFrames.map((frame, idx) => (
              <motion.figure
                key={frame.title}
                className={`frame-item ${idx % 2 === 0 ? 'frame-up' : 'frame-down'}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.65, delay: idx * 0.05 }}
                whileHover={{ rotateY: idx % 2 === 0 ? 7 : -7, rotateX: 4, scale: 1.03 }}
              >
                <div className="frame-visual">
                  <DriveImage src={frame.image} alt={frame.title} className="frame-visual-img" />
                </div>
                <figcaption>
                  <h4>{frame.title}</h4>
                  <p>{frame.film}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
          <motion.div className="frames-track frames-track-bottom" style={{ x: bottomX, rotate: bottomRotate }}>
            {bottomFrames.map((frame, idx) => (
              <motion.figure
                key={frame.title}
                className={`frame-item ${idx % 2 === 0 ? 'frame-down' : 'frame-up'}`}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.65, delay: idx * 0.05 }}
                whileHover={{ rotateY: idx % 2 === 0 ? -7 : 7, rotateX: 4, scale: 1.03 }}
              >
                <div className="frame-visual">
                  <DriveImage src={frame.image} alt={frame.title} className="frame-visual-img" />
                </div>
                <figcaption>
                  <h4>{frame.title}</h4>
                  <p>{frame.film}</p>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      )}
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

function TeamProfileCard({ member, isMobile }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const lightX = useMotionValue(50)
  const lightY = useMotionValue(50)
  const rX = useSpring(rotateX, { stiffness: 170, damping: 20, mass: 0.7 })
  const rY = useSpring(rotateY, { stiffness: 170, damping: 20, mass: 0.7 })
  const glowOffsetX = useTransform(lightX, (v) => `${v - 50}%`)
  const glowOffsetY = useTransform(lightY, (v) => `${v - 50}%`)
  const [mx, setMx] = useState(50)
  const [my, setMy] = useState(50)

  return (
    <motion.article
      key={member.name}
      className="team-roster-card"
      style={{
        rotateX: rX,
        rotateY: rY,
        transformPerspective: 1200,
        '--mx': `${mx}%`,
        '--my': `${my}%`
      }}
      onMouseMove={(e) => {
        if (isMobile) return
        const rect = e.currentTarget.getBoundingClientRect()
        const px = ((e.clientX - rect.left) / rect.width) * 100
        const py = ((e.clientY - rect.top) / rect.height) * 100
        setMx(px)
        setMy(py)
        rotateY.set(((px / 100) - 0.5) * 12)
        rotateX.set(((py / 100) - 0.5) * -10)
        lightX.set(px)
        lightY.set(py)
      }}
      onMouseLeave={() => {
        rotateX.set(0)
        rotateY.set(0)
        lightX.set(50)
        lightY.set(50)
        setMx(50)
        setMy(50)
      }}
      whileHover={isMobile ? { y: -2, scale: 1.006 } : { y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 180, damping: 20 }}
    >
      <motion.div className="team-roster-glow" style={{ x: glowOffsetX, y: glowOffsetY }} />
      <DriveImage src={member.photo} alt={member.name} className="team-photo" />
      <div>
        <h4>{member.name}</h4>
        <p>{member.role}</p>
      </div>
    </motion.article>
  )
}

function TeamStack() {
  const ref = useRef(null)
  const [activeCard, setActiveCard] = useState(1)
  const [spreadAmount, setSpreadAmount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 94%', 'end 38%'] })

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const next = Math.max(0, Math.min(1, (value - 0.08) / 0.24))
    setSpreadAmount(isMobile ? 0 : next)
  })

  const stack = [
    {
      id: 0,
      role: 'FAR SPENCER',
      text: 'Founder | Film direction, story architecture, and chapter orchestration.'
    },
    {
      id: 1,
      role: 'Jade Lagasca',
      text: 'Founder | Lens language, movement grammar, and atmosphere-first composition.'
    },
    {
      id: 2,
      role: 'Krishan Miguel & Micah Jirah Mendoza',
      text: 'Founders | Editorial systems, production leadership, and final-frame execution.'
    }
  ]

  return (
    <section id="team" ref={ref} className="content-section">
      <SectionHeading
        eyebrow="INVISION"
        title="The Team who made it happen"
        subtitle="Built by storytellers, directors, editors, cinematographers, and creatives who shared the same vision from concept to final frame."
      />
      <div className={`team-stack-wrap ${isMobile ? 'is-mobile-stack' : spreadAmount > 0.03 ? 'is-spread' : 'is-stacked'}`}>
        {stack.map((item, idx) => {
          const isActive = activeCard === idx
          const spreadX = idx === 0 ? -410 : idx === 1 ? 0 : 410
          const spreadRotate = idx === 0 ? -15 : idx === 1 ? 0 : 15
          const stackY = idx * 5
          const spreadY = idx === 0 ? 24 : idx === 1 ? -16 : 24
          const styleX = isMobile ? 0 : spreadX * spreadAmount
          const styleRotate = isMobile ? 0 : spreadRotate * spreadAmount
          const styleY = isMobile ? 0 : stackY + (spreadY - stackY) * spreadAmount + (isActive ? -16 : 0)
          const stackOpacity = 0.99 - spreadAmount * 0.3
          const glassOpacity = 0.02 + spreadAmount * 0.16
          const redOpacity = 0.03 + spreadAmount * 0.16
          const tiltY = isMobile ? 0 : (idx === 1 ? 7 : 4) * spreadAmount
          const tiltX = isMobile ? 0 : (idx === 1 ? -4 : -2) * spreadAmount

          return (
            <motion.article
              key={item.role}
              className={`team-stack-card team-stack-${idx} ${isActive ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveCard(idx)}
              onClick={() => setActiveCard(idx)}
              style={{
                x: styleX,
                y: styleY,
                rotate: styleRotate,
                rotateY: tiltY,
                rotateX: tiltX,
                zIndex: isActive ? 8 : 3 - Math.abs(1 - idx),
                '--stack-opacity': stackOpacity,
                '--glass-opacity': glassOpacity,
                '--red-opacity': redOpacity
              }}
              whileHover={isMobile ? { y: -4, scale: 1.008 } : { y: isActive ? styleY - 4 : styleY - 10, rotateX: 3, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 170, damping: 20, mass: 0.9 }}
            >
              <span>{String(idx + 1).padStart(2, '0')}</span>
              <h3>{item.role}</h3>
              <p>{item.text}</p>
            </motion.article>
          )
        })}
      </div>
      <div className="team-roster-grid">
        {teamMembers.map((member) => (
          <TeamProfileCard key={member.name} member={member} isMobile={isMobile} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [introPhase, setIntroPhase] = useState('reveal')
  const [navReady, setNavReady] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 22 })
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 22 })
  const { scrollY } = useScroll()
  const heroDepthY = useTransform(scrollY, [0, 1000], [0, -85])
  const logoDepth = useTransform(scrollY, [0, 700], [0, -24])
  const logoGlideX = useSpring(useTransform(pointerX, [-0.5, 0.5], [-24, 24]), { stiffness: 95, damping: 20 })
  const logoGlideY = useSpring(useTransform(pointerY, [-0.5, 0.5], [-16, 16]), { stiffness: 95, damping: 20 })
  const logoRotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-11, 11]), { stiffness: 110, damping: 20 })
  const logoRotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [8, -8]), { stiffness: 110, damping: 20 })
  const logoScaleHover = useSpring(useTransform(pointerY, [-0.5, 0.5], [1.035, 0.985]), { stiffness: 90, damping: 18 })
  const logoCombinedY = useTransform(() => logoDepth.get() + logoGlideY.get())

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
    const doneTimer = setTimeout(() => setIntroPhase('done'), 7000)

    return () => {
      clearTimeout(pauseTimer)
      clearTimeout(blackTimer)
      clearTimeout(doneTimer)
    }
  }, [])

  useEffect(() => {
    let navTimer
    let contentTimer

    if (introPhase === 'done') {
      navTimer = setTimeout(() => setNavReady(true), 140)
      contentTimer = setTimeout(() => setContentReady(true), 420)
    } else {
      setNavReady(false)
      setContentReady(false)
    }

    return () => {
      clearTimeout(navTimer)
      clearTimeout(contentTimer)
    }
  }, [introPhase])

  return (
    <div
      className={`cinematic-root ${introPhase !== 'done' ? 'intro-active' : ''}`}
      onMouseMove={(e) => {
        mouseX.set(e.clientX - 170)
        mouseY.set(e.clientY - 170)
        const w = typeof window !== 'undefined' ? window.innerWidth : 1
        const h = typeof window !== 'undefined' ? window.innerHeight : 1
        pointerX.set(e.clientX / w - 0.5)
        pointerY.set(e.clientY / h - 0.5)
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

      <motion.header
        className="top-nav-wrap"
        initial={false}
        animate={
          navReady
            ? { opacity: 1, y: 0, filter: 'blur(0px)' }
            : { opacity: 0, y: -180, filter: 'blur(8px)' }
        }
        transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: navReady ? 'auto' : 'none' }}
      >
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
      </motion.header>

      <main className={!contentReady ? 'content-pre' : 'content-reveal'}>
        <section id="hero" className="hero-scene">
          <motion.div className="hero-depth-layer" style={{ y: heroDepthY }}>
            <motion.img
              src="/invision_logo_transparent.png"
              alt="INVISION FILMS logo"
              className="hero-logo hero-logo-3d"
              style={{
                x: logoGlideX,
                y: logoCombinedY,
                rotateY: logoRotateY,
                rotateX: logoRotateX,
                scale: logoScaleHover,
                transformPerspective: 1200
              }}
              initial={false}
              animate={contentReady ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.05, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.h1
              initial={false}
              animate={contentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title"
            >
              INVISION FILMS
            </motion.h1>
            <motion.p
              initial={false}
              animate={contentReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.88, delay: 0.44, ease: [0.22, 1, 0.36, 1] }}
              className="hero-motto"
            >
              Turning Perspectives into <span>Motion.</span>
            </motion.p>
          </motion.div>
        </section>

        <section id="about" className="content-section">
          <SectionHeading
            eyebrow="INVISION"
            title={aboutContent.title}
            subtitle={aboutContent.subtitle}
          />
          <div className="about-glass">{aboutContent.body}</div>
        </section>

        <FilmographyShowcase />

        <section className="content-section awards-section">
          <SectionHeading
            eyebrow="INVISION"
            title="RECOGNITION"
            subtitle="Recognition and festival features sourced from the INVISION FILMS dossier."
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
                <DriveImage src={group.photo} alt={group.film} className="award-photo" />
                <h3>{group.film}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <a href={group.article} target="_blank" rel="noreferrer">
                  View Article
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <FramesCarousel />

        <FilmLanguageMarquee />
        <TeamStack />
      </main>

      <footer className={`site-footer ${!contentReady ? 'content-pre' : 'content-reveal footer-reveal'}`}>
        <p>INVISION FILMS</p>
        <a href="mailto:invisionfilms21@gmail.com">invisionfilms21@gmail.com</a>
      </footer>
    </div>
  )
}

