import React, { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useSpring, useTransform, useScroll } from 'framer-motion'
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
  title: 'From Cebuano Roots to Award‑winning Films',
  subtitle: 'Founded in 2021 as a Cebuano student multimedia body, we have since evolved into a professional creative team producing award-winning films.',
  body: 'INVISION FILMS was founded in 2021 as a Cebuano student multimedia collective driven by a shared passion for storytelling and filmmaking. Through years of persistence, collaboration, and creative growth, we evolved into a professional team producing award-winning films. We remain rooted in cinematic storytelling, and our visual language adapts to the emotion, atmosphere, and identity of every story we choose to tell.'
}

const chapters = [
  {
    title: '1975',
    chapter: 'Chapter I',
    year: '2021',
    genre: 'Romantic Drama',
    logline: 'Every so often, time is unpredictable and destiny is inescapable.',
    aura: 'aura-1975',
    poster: driveSrc('1S2Senewo9YubCPs3L78lV8htFvZapQ2T'),
    awardImage: '',
    awards: [
      'Debut Film'
    ]
  },
  {
    title: '11:11',
    chapter: 'Chapter II',
    year: '2022',
    genre: 'Horror',
    logline: 'Claire, a skeptic who dismissed superstition, opens a doorway between the 3rd and 6th dimensions where reality unravels into something unholy.',
    aura: 'aura-1111',
    poster: driveSrc('1VqQDcLoedoCMP4AMyyNOwDqgAD_JyplW'),
    awardImage: '/1111awards.png',
    awards: [
      'SINEDISIPULO "X" Film Festival - Most Viewed Film',
      'CINEU "Catorce" Film Festival - Best Film, Best Picture, Best Editing, Best Cinematography, Best Sound Design, Jury Prize Award, Best Actress'
    ]
  },
  {
    title: 'Specter Dream',
    chapter: 'Chapter III',
    year: '2022',
    genre: 'Romantic BL Drama',
    logline: 'A dreamlike love too fragile for reality, where John is somehow everywhere but nowhere in sight.',
    aura: 'aura-specter',
    poster: driveSrc('13TZHAFBpOIjeMvQ-qJhfoZtRMyijOVUG'),
    awardImage: '/specterdream-awards.png',
    awards: [
      'CINEU "Catorce" Film Festival - Best Director, Best Production Design, Best Actor, Best Supporting Actor'
    ]
  },
  {
    title: 'PASAGLAWOM',
    chapter: 'Chapter IV',
    year: '2022',
    genre: 'Romantic Drama',
    logline: 'In blindness and love, Isabel discovers a reality she was never meant to see.',
    aura: 'aura-pasaglawom',
    poster: driveSrc('1sqswls2-xbSKB4emFtok9_GxImYMKY2i'),
    awardImage: '/pasaglawom-awards.png',
    awards: [
      'SINEDISIPULO "XI" Film Exhibition - Official Selection'
    ]
  },
  {
    title: 'Merese',
    chapter: 'Chapter V',
    year: '2023',
    genre: 'Comedy',
    logline: 'Five friends join a 48-hour film challenge, but with no script in hand, imagination takes over and reality begins to unravel.',
    aura: 'aura-merese',
    poster: driveSrc('1POrIhcBCBpT0p7hEmUrF-weF1LYMaV7I'),
    awardImage: '/merese-awards.png',
    awards: [
      "DTI's Fiesta Kucha Film Festival 2025 - Best Editing"
    ]
  },
  {
    title: 'Somnium',
    chapter: 'Chapter VI',
    year: '2025',
    genre: 'Psychological Horror',
    logline: 'At the center is Elaine De Gracia, a student nurse in a Catholic school whose mind quietly unravels as sanity begins to expire.',
    aura: 'aura-somnium',
    poster: driveSrc('1oNOu2PlykdDlNn-ByDzXrVSrpEUkLwNk'),
    awardImage: '/somnium-awards.png',
    awards: [
      '3rd University of Wollongong in Dubai Film Festival 2025 - Top 10 Official Selection'
    ]
  },
  {
    title: 'Taphaw',
    chapter: 'Chapter VII',
    year: '2026',
    genre: 'Drama',
    logline: 'In the quiet of the unseen, Elsie Daayon fights tirelessly for her dreams, climbing through struggle and sacrifice. Can hope guide her to the top?',
    aura: 'aura-taphaw',
    poster: driveSrc('1OhwFBCW1V15OWkTJqapGA40XZMMXhXjH'),
    awardImage: '/taphaw-awards.png',
    awards: [
      'Sinulog Film Festival 2026 - Best Film, Best Screenplay, Best Director, Best Cinematography, Best Production Design, Best Playbill, Best Actress',
      'Sinepiyu XVIII Diwa: Sa Lente Ng Katauhan - Best Actress'
    ]
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
  },
  {
    film: 'Taphaw Winners Screening and Talkback',
    items: ['Featured on Sinegang.ph', 'Cinematheque Centre - Manila (FDCP)'],
    photo: driveSrc('1z1-KcjeuwTs1j-EV7r7kvcO1sdQu8bVT'),
    article: 'https://www.sinegang.ph/'
  }
]

const frames = [
  {
    title: 'Where The Sixth Dimension Burns',
    film: '11:11 (2022)',
    image: driveSrc('1crhqiQolAGGtdFK7sCraY4WCg3WelfRc')
  },
  {
    title: 'Heart Of Padayon',
    film: 'Taphaw (2026)',
    image: driveSrc('1Z_pPnp2uied3DpdyKVBxMwuxY_clL1c9')
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
    title: 'Waves In A Dream',
    film: 'Specter Dream (2022)',
    image: driveSrc('1Mxsn0UFH6MoZF0A4mqRLXeTjBdk1mg67')
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
  { name: 'Micah Jirah Mendoza', role: 'Production Secretary & Actress', photo: driveSrc('1WRYwPWr4poKH3WOh5Sk3jEc1-xk3gC99') },
  { name: 'Jade Lagasca', role: 'Director of Cinematography & Editor', photo: driveSrc('1HXOKJ6U7GsbMqEA-vnreqKIEtOThz9Fj') },
  { name: 'Denver Hoybia', role: 'Assistant Director & Actor', photo: driveSrc('1drFQkJs_U74Ni2uArCDGHrIjCEI2bomX') },
  { name: 'John Lloyd Caramihan', role: 'Production Designer & Actor', photo: driveSrc('1e3uzy5UlqATC5Ify3B3FR1s-9BNo0O2f') },
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

function FilmCarouselItem({ chapter, isActive, rel, hidden, direction, isMobile, dragOffset = 0, isDragging = false }) {
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const sx = useSpring(tiltX, { stiffness: 170, damping: 20, mass: 0.7 })
  const sy = useSpring(tiltY, { stiffness: 170, damping: 20, mass: 0.7 })
  const [mx, setMx] = useState(50)
  const [my, setMy] = useState(50)
  const mobileMaxDrag = 140
  const dragNorm = isMobile ? Math.max(-1, Math.min(1, dragOffset / mobileMaxDrag)) : 0
  const dragPower = Math.abs(dragNorm)
  const dragToNext = dragNorm < 0
  const dragToPrev = dragNorm > 0

  let x = isMobile ? (isActive ? 0 : rel < 0 ? -34 : 34) : isActive ? 0 : rel < 0 ? -360 : 360
  let y = isMobile ? (isActive ? 0 : 16) : isActive ? 0 : 14
  let scale = isActive ? 1 : isMobile ? 0.9 : 0.82
  let opacity = hidden ? 0 : isActive ? 1 : 0.5
  let rotateYBase = isActive ? 0 : isMobile ? 0 : rel < 0 ? 22 : -22
  let rotateZBase = isActive ? 0 : isMobile ? 0 : rel < 0 ? -3.5 : 3.5
  let blur = isActive ? 0 : 2.8
  let zIndex = isActive ? 10 : rel < 0 ? 6 : 5

  if (isMobile) {
    const baseLeft = -102
    const baseRight = 102
    if (isActive) {
      x = dragOffset * 0.78
      y = dragPower * 6
      scale = 1 - dragPower * 0.045
      opacity = 1
      blur = dragPower * 0.55
      rotateYBase = dragNorm * 3.8
      rotateZBase = dragNorm * 1.4
      zIndex = 10
    } else if (rel === 1) {
      if (isDragging && dragToNext) {
        x = baseRight - dragPower * 94
        y = 14 - dragPower * 8
        scale = 0.86 + dragPower * 0.14
        opacity = 0.42 + dragPower * 0.54
        blur = 3.4 - dragPower * 2.9
        rotateYBase = -9 + dragPower * 9
        rotateZBase = 2.4 - dragPower * 2.4
        zIndex = 9
      } else {
        x = 38
        y = 16
        scale = 0.9
        opacity = 0.5
        blur = 2.8
      }
    } else if (rel === -1) {
      if (isDragging && dragToPrev) {
        x = baseLeft + dragPower * 94
        y = 14 - dragPower * 8
        scale = 0.86 + dragPower * 0.14
        opacity = 0.42 + dragPower * 0.54
        blur = 3.4 - dragPower * 2.9
        rotateYBase = 9 - dragPower * 9
        rotateZBase = -2.4 + dragPower * 2.4
        zIndex = 9
      } else {
        x = -38
        y = 16
        scale = 0.9
        opacity = 0.5
        blur = 2.8
      }
    }
  }

  return (
    <motion.article
      className={`film-carousel-card ${isActive ? 'is-active' : 'is-inactive'} ${chapter.aura}`}
      animate={{
        x,
        y,
        scale,
        opacity,
        rotateY: hidden ? 0 : rotateYBase,
        rotateZ: hidden ? 0 : rotateZBase,
        zIndex,
        filter: `blur(${hidden ? 6 : blur}px) brightness(${isActive ? 1 : 0.62})`
      }}
      initial={false}
      transition={{ duration: isDragging && isMobile ? 0.12 : 0.68, ease: [0.22, 1, 0.36, 1] }}
      style={{ pointerEvents: hidden ? 'none' : 'auto' }}
      onMouseMove={(e) => {
        if (!isActive || isMobile) return
        const rect = e.currentTarget.getBoundingClientRect()
        const px = ((e.clientX - rect.left) / rect.width) * 100
        const py = ((e.clientY - rect.top) / rect.height) * 100
        setMx(px)
        setMy(py)
        tiltY.set(((px / 100) - 0.5) * 9)
        tiltX.set(((py / 100) - 0.5) * -8)
      }}
      onMouseLeave={() => {
        tiltX.set(0)
        tiltY.set(0)
        setMx(50)
        setMy(50)
      }}
    >
      <motion.div
        className="film-carousel-card-inner"
        style={{
          rotateX: sx,
          rotateY: sy,
          transformPerspective: 1200,
          '--mx': `${mx}%`,
          '--my': `${my}%`
        }}
      >
        <div className="film-carousel-poster-shell">
          <div className="filmography-poster-card">
            <DriveImage src={chapter.poster} alt={`${chapter.title} poster`} className="film-frame-poster" />
            {isMobile ? (
              <div className="film-poster-award">
                {chapter.awardImage ? (
                  <img src={chapter.awardImage} alt={`${chapter.title} awards`} className="film-poster-award-img" loading="lazy" />
                ) : (
                  <div className="film-poster-award-fallback">{chapter.awards?.[0] || 'Award Pending'}</div>
                )}
              </div>
            ) : null}
            <div className="film-frame-light" />
            <span className="film-frame-mark">{chapter.chapter}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isActive ? (
            <motion.div
              key={`${chapter.title}-details-${direction}`}
              className="film-carousel-detail"
              initial={{ opacity: 0, x: direction > 0 ? 36 : -36, y: 12 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, x: direction > 0 ? -24 : 24, y: 8 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <article className="film-text">
                <p className="film-meta">
                  {chapter.year} | {chapter.genre}
                </p>
                <h3>{chapter.title}</h3>
                <p>{chapter.logline}</p>
                {!isMobile ? (
                  chapter.awardImage ? (
                    <div className={`film-award-image-wrap ${chapter.title === '11:11' || chapter.title === 'Taphaw' ? 'is-large-award' : ''}`}>
                      <img src={chapter.awardImage} alt={`${chapter.title} awards`} className="film-award-image" loading="lazy" />
                    </div>
                  ) : (
                    <div className="film-award-text-fallback">
                      <span>{chapter.awards?.[0] || 'Award pending'}</span>
                    </div>
                  )
                ) : null}
              </article>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </motion.div>
    </motion.article>
  )
}

function FilmographyShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [autoEnabled, setAutoEnabled] = useState(true)
  const [dragOffset, setDragOffset] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const resumeTimerRef = useRef(null)
  const touchStartXRef = useRef(0)
  const touchDeltaXRef = useRef(0)
  const touchLastShiftAtRef = useRef(0)

  const wrap = (value) => {
    const total = chapters.length
    return (value + total) % total
  }

  const goNext = () => {
    setDirection(1)
    setActiveIndex((prev) => wrap(prev + 1))
  }

  const goPrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => wrap(prev - 1))
  }

  const goTo = (index) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  const pauseAutoscroll = (resumeInMs = 7000) => {
    setAutoEnabled(false)
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    resumeTimerRef.current = setTimeout(() => {
      setAutoEnabled(true)
    }, resumeInMs)
  }

  const relativePosition = (index) => {
    const total = chapters.length
    const raw = index - activeIndex
    if (raw > total / 2) return raw - total
    if (raw < -total / 2) return raw + total
    return raw
  }

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (isHovering || !autoEnabled) return
    const id = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => wrap(prev + 1))
    }, 6200)
    return () => clearInterval(id)
  }, [isHovering, autoEnabled])

  useEffect(() => {
    return () => {
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
    }
  }, [])

  return (
    <section id="films" className="chapters-section filmography-scene">
      <SectionHeading
        eyebrow="INVISION"
        title="FILMOGRAPHY"
        subtitle="A curated journey through stories shaped by memory, identity, emotion, and motion."
        className="filmography-heading"
        subtitleClassName="filmography-subtitle"
      />
      <div
        className="film-carousel-shell"
        onMouseEnter={() => {
          setIsHovering(true)
          setAutoEnabled(false)
          if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        }}
        onMouseLeave={() => {
          setIsHovering(false)
          pauseAutoscroll(3200)
        }}
        onTouchStart={(e) => {
          const x = e.changedTouches?.[0]?.clientX ?? 0
          touchStartXRef.current = x
          touchDeltaXRef.current = 0
          touchLastShiftAtRef.current = 0
          setIsDragging(true)
          setAutoEnabled(false)
          if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        }}
        onTouchMove={(e) => {
          const x = e.changedTouches?.[0]?.clientX ?? 0
          const delta = x - touchStartXRef.current
          touchDeltaXRef.current = delta
          setDragOffset(Math.max(-140, Math.min(140, delta * 0.6)))

          // Continuous swipe: while finger is still down, crossing threshold
          // shifts to the neighboring film immediately and keeps chaining.
          const now = Date.now()
          const minInterval = 140
          const shiftThreshold = 120
          if (Math.abs(delta) >= shiftThreshold && now - touchLastShiftAtRef.current >= minInterval) {
            if (delta < 0) {
              setDirection(1)
              setActiveIndex((prev) => wrap(prev + 1))
            } else {
              setDirection(-1)
              setActiveIndex((prev) => wrap(prev - 1))
            }
            touchLastShiftAtRef.current = now
            touchStartXRef.current = x
            touchDeltaXRef.current = 0
            setDragOffset(0)
          }
        }}
        onTouchEnd={() => {
          const delta = touchDeltaXRef.current
          setIsDragging(false)
          if (Math.abs(delta) >= 44) {
            if (delta < 0) goNext()
            else goPrev()
          }
          pauseAutoscroll(6500)
          setDragOffset(0)
          touchDeltaXRef.current = 0
        }}
        onTouchCancel={() => {
          setIsDragging(false)
          touchDeltaXRef.current = 0
          setDragOffset(0)
          pauseAutoscroll(4000)
        }}
      >
        <button
          className="film-carousel-arrow film-carousel-arrow-left"
          onClick={() => {
            pauseAutoscroll(7000)
            goPrev()
          }}
          aria-label="Previous film"
        >
          <span>&lsaquo;</span>
        </button>
        <button
          className="film-carousel-arrow film-carousel-arrow-right"
          onClick={() => {
            pauseAutoscroll(7000)
            goNext()
          }}
          aria-label="Next film"
        >
          <span>&rsaquo;</span>
        </button>

        <div className="film-carousel-stage">
          {chapters.map((chapter, idx) => {
            const rel = relativePosition(idx)
            const isActive = rel === 0
            const hidden = Math.abs(rel) > 1
            return (
              <FilmCarouselItem
                key={chapter.title}
                chapter={chapter}
                isActive={isActive}
                rel={rel}
                hidden={hidden}
                direction={direction}
                isMobile={isMobile}
                dragOffset={dragOffset}
                isDragging={isDragging}
              />
            )
          })}
        </div>

        <div className="film-carousel-indicators">
          {chapters.map((chapter, idx) => (
            <button
              key={chapter.title}
              className={`film-dot ${idx === activeIndex ? 'is-active' : ''}`}
              onClick={() => {
                pauseAutoscroll(7000)
                goTo(idx)
              }}
              aria-label={`Show ${chapter.title}`}
            />
          ))}
        </div>
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
        eyebrow="INVISION"
        title="Cinematic Frames"
        subtitle="Floating stills from a moving film world."
      />
      {isMobile ? (
        <div className="frames-mobile-grid">
          {frames.map((frame, idx) => (
            <motion.figure
              key={frame.title}
              className="frame-item"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -84 : 84, y: 18, filter: 'blur(7px)' }}
              whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.035, ease: [0.22, 1, 0.36, 1] }}
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
                initial={{ opacity: 0, x: idx % 2 === 0 ? -110 : 110, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.72, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
                initial={{ opacity: 0, x: (idx + topFrames.length) % 2 === 0 ? -110 : 110, y: 24, filter: 'blur(8px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.72, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
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
        eyebrow="INVISION"
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

function TeamProfileCard({ member, isMobile, entryIndex }) {
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
      initial={{ opacity: 0, x: entryIndex % 2 === 0 ? -96 : 96, y: 18, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.2 }}
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
      transition={{ type: 'spring', stiffness: 180, damping: 20, mass: 0.85 }}
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
  const stackRef = useRef(null)
  const [activeCard, setActiveCard] = useState(1)
  const [spreadAmount, setSpreadAmount] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start 88%', 'end 45%'] })

  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)')
    const update = () => setIsMobile(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    const raw = Math.max(0, Math.min(1, (value - 0.02) / 0.58))
    const eased = Math.pow(raw, 0.82)
    if (isMobile) {
      // Spread earlier and finish earlier on mobile so cards are fully
      // separated when this section is in focus.
      const mobileStart = 0.0
      const mobileEnd = 0.26
      const mobileProgress = Math.max(0, Math.min(1, (value - mobileStart) / (mobileEnd - mobileStart)))
      setSpreadAmount(Math.pow(mobileProgress, 0.9))
      return
    }
    setSpreadAmount(eased)
  })

  const stack = [
    {
      id: 0,
      role: 'JADE LAGASCA & KRISHAN MIGUEL',
      text: 'Founders | Cinematography, editorial systems, and web craft shaping the visual language of every chapter.'
    },
    {
      id: 1,
      role: 'FAR SPENCER',
      text: 'Founder | Film direction, story architecture, and chapter orchestration across concept to final frame.'
    },
    {
      id: 2,
      role: 'MICAH JIRAH & VALERIE DEMICILLO',
      text: 'Founders | Production leadership, performance energy, and animated visual finishing.'
    }
  ]

  return (
    <section id="team" ref={ref} className="content-section">
      <SectionHeading
        eyebrow="INVISION"
        title="The Team who made it happen"
        subtitle="Built by storytellers, directors, editors, cinematographers, and creatives who shared the same vision from concept to final frame."
      />
      <div ref={stackRef} className={`team-stack-wrap ${spreadAmount > 0.03 ? 'is-spread' : 'is-stacked'}`}>
        {stack.map((item, idx) => {
          const isActive = activeCard === idx
          // Desktop/tablet horizontal fan (mobile stays vertical via isMobile branch)
          const spreadX = idx === 0 ? -248 : idx === 1 ? 0 : 248
          const spreadRotate = idx === 0 ? -9 : idx === 1 ? 0 : 9
          const styleX = isMobile ? 0 : spreadX * spreadAmount
          const styleRotate = isMobile ? 0 : spreadRotate * spreadAmount
          const desktopStackY = idx * 5
          // Desktop/tablet: horizontal spread with minimal Y drift.
          const desktopSpreadY = idx === 0 ? -8 : idx === 1 ? 0 : 8
          const mobileStackY = [0, 18, 36][idx]
          // Fixed vertical slots with clear gaps (no touching/overlap).
          const mobileSpreadY = [0, 192, 384][idx]
          const styleY = isMobile
            ? mobileStackY + (mobileSpreadY - mobileStackY) * spreadAmount
            : desktopStackY + (desktopSpreadY - desktopStackY) * spreadAmount + (isActive ? -10 : 0)
          const stackOpacity = 0.99 - spreadAmount * 0.3
          const glassOpacity = 0.02 + spreadAmount * 0.16
          const redOpacity = 0.03 + spreadAmount * 0.16
          const tiltY = isMobile ? 0 : (idx === 1 ? 7 : 4) * spreadAmount
          const tiltX = isMobile ? 0 : (idx === 1 ? -4 : -2) * spreadAmount

          return (
            <motion.article
              key={item.role}
              className={`team-stack-card team-stack-${idx} ${idx === 1 ? 'is-featured' : ''} ${isActive ? 'is-active' : ''}`}
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
              <h3>{item.role}</h3>
              <p>{item.text}</p>
            </motion.article>
          )
        })}
      </div>
      <div className="team-roster-grid">
        {teamMembers.map((member, idx) => (
          <TeamProfileCard key={member.name} member={member} isMobile={isMobile} entryIndex={idx} />
        ))}
      </div>
    </section>
  )
}

export default function App() {
  const [introPhase, setIntroPhase] = useState('reveal')
  const [navReady, setNavReady] = useState(false)
  const [contentReady, setContentReady] = useState(false)
  const [compactNav, setCompactNav] = useState(false)
  const [navOpen, setNavOpen] = useState(false)
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

  useEffect(() => {
    const media = window.matchMedia('(max-width: 900px)')
    const update = () => {
      setCompactNav(media.matches)
      if (!media.matches) setNavOpen(false)
    }
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

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
          <button
            className={`nav-toggle ${navOpen ? 'is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            onClick={() => setNavOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
          <div className={`top-links ${compactNav ? 'is-compact' : ''} ${navOpen ? 'is-open' : ''}`}>
            <a href="#about" onClick={() => setNavOpen(false)}>About</a>
            <a href="#films" onClick={() => setNavOpen(false)}>Films</a>
            <a href="#frames" onClick={() => setNavOpen(false)}>Frames</a>
            <a href="#team" onClick={() => setNavOpen(false)}>Team</a>
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
            title="RECOGNITIONS"
            subtitle="Recognitions and festival features sourced from the INVISION FILMS dossier."
          />
          <div className="awards-grid">
            {awards.map((group, idx) => (
              <motion.article
                key={group.film}
                className={`award-plaque ${group.film === 'Taphaw Winners Screening and Talkback' ? 'is-center' : ''}`}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -104 : 104, y: 18, filter: 'blur(7px)' }}
                whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: 0.68, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
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
        <div className="footer-right">
          <a href="mailto:invisionfilms21@gmail.com">invisionfilms21@gmail.com</a>
          <div className="footer-socials">
            <a href="https://www.facebook.com/INVISION.Films" target="_blank" rel="noreferrer" aria-label="INVISION Facebook">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M13.5 8.4V6.9c0-.9.6-1.1 1-1.1h1.4V3.2h-1.9c-2.3 0-2.8 1.7-2.8 2.9v2.3H9.3v2.8h1.9v7h2.3v-7h1.9l.3-2.8h-2.2z" fill="currentColor" />
                </svg>
              </span>
              <span>INVISION</span>
            </a>
            <a href="https://www.instagram.com/invision.films/" target="_blank" rel="noreferrer" aria-label="INVISION Instagram">
              <span className="footer-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" role="img">
                  <path d="M7.8 3h8.4A4.8 4.8 0 0 1 21 7.8v8.4a4.8 4.8 0 0 1-4.8 4.8H7.8A4.8 4.8 0 0 1 3 16.2V7.8A4.8 4.8 0 0 1 7.8 3zm0 1.9A2.9 2.9 0 0 0 4.9 7.8v8.4a2.9 2.9 0 0 0 2.9 2.9h8.4a2.9 2.9 0 0 0 2.9-2.9V7.8a2.9 2.9 0 0 0-2.9-2.9H7.8zm8.8 1.4a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.9a3.1 3.1 0 1 0 0 6.2 3.1 3.1 0 0 0 0-6.2z" fill="currentColor" />
                </svg>
              </span>
              <span>INVISION</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

