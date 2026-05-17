import React from 'react'

export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <p className="mb-3 font-display text-sm uppercase tracking-[0.4em] text-ember/85">{eyebrow}</p>
      <h2 className="font-display text-4xl uppercase tracking-wide text-white md:text-5xl">{title}</h2>
      {subtitle ? <p className="mt-4 text-sm text-slate-300 md:text-base">{subtitle}</p> : null}
    </div>
  )
}
