import React from 'react'
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle, className = '', subtitleClassName = '' }) {
  const sectionLabel = eyebrow || 'INVISION'
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 92%', 'end 18%']
  })
  const blockY = useTransform(scrollYProgress, [0, 0.55, 1], [44, 0, -16])
  const blockOpacity = useTransform(scrollYProgress, [0, 0.22, 1], [0, 1, 1])
  const blockScale = useTransform(scrollYProgress, [0, 0.45, 1], [0.955, 1, 1.01])
  const blockBlur = useTransform(scrollYProgress, [0, 0.26, 1], [8, 0, 0])
  const blockFilter = useMotionTemplate`blur(${blockBlur}px)`

  const eyebrowY = useTransform(scrollYProgress, [0, 1], [18, -10])
  const titleY = useTransform(scrollYProgress, [0, 1], [28, -12])
  const subtitleY = useTransform(scrollYProgress, [0, 1], [38, -14])

  return (
    <motion.div
      ref={ref}
      initial={false}
      className={`mx-auto mb-10 max-w-3xl text-center ${className}`}
      style={{ y: blockY, opacity: blockOpacity, scale: blockScale, filter: blockFilter }}
    >
      <motion.p
        className="mb-3 font-display text-sm uppercase tracking-[0.4em] text-ember/85"
        style={{ y: eyebrowY }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {sectionLabel}
      </motion.p>
      <motion.h2
        className="heading-lock font-display text-4xl uppercase tracking-wide text-white md:text-5xl"
        style={{ y: titleY }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {title}
      </motion.h2>
      {subtitle ? (
        <motion.p
          className={`section-subtitle mt-4 text-sm text-slate-300 md:text-base ${subtitleClassName}`}
          style={{ y: subtitleY }}
          transition={{ duration: 1.28, ease: [0.22, 1, 0.36, 1] }}
        >
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
