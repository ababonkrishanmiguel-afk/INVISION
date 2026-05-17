import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="mx-auto mb-10 max-w-3xl text-center"
    >
      <p className="mb-3 font-display text-sm uppercase tracking-[0.4em] text-ember/85">{eyebrow}</p>
      <h2 className="font-display text-4xl uppercase tracking-wide text-white md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm text-slate-300 md:text-base">{subtitle}</p> : null}
    </motion.div>
  )
}
