import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useState } from 'react'
import { projects } from '../data/resume'

export function ProjectStack() {
  const [index, setIndex] = useState(0)
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-120, 0, 120], [-8, 0, 8])

  const project = projects[index]

  const next = () => setIndex((i) => (i + 1) % projects.length)
  const prev = () => setIndex((i) => (i - 1 + projects.length) % projects.length)

  return (
    <section id="builds" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs text-[var(--color-hot)]">03 / builds</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Academic artifact deck</h2>
        <p className="mt-3 max-w-lg text-white/50">
          Drag-ish stack — flip through shipped university systems.
        </p>

        <div className="mt-12 flex flex-col items-center gap-8 md:flex-row md:items-stretch">
          <motion.div
            style={{ rotateZ: rotate }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -80) next()
              else if (info.offset.x > 80) prev()
            }}
            className="glass relative w-full max-w-xl cursor-grab rounded-3xl p-8 active:cursor-grabbing md:min-h-[320px]"
          >
            <div className="absolute right-6 top-6 font-mono text-xs text-white/30">
              {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
            </div>
            <h3 className="text-3xl font-bold">{project.name}</h3>
            <p className="mt-4 text-lg leading-relaxed text-white/60">
              {project.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-cyan)]/30 px-3 py-1 font-mono text-[10px] text-[var(--color-cyan)]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-10 font-mono text-[10px] text-white/35">
              ← swipe / drag →
            </p>
          </motion.div>

          <div className="flex flex-row gap-3 md:flex-col md:justify-center">
            <button
              type="button"
              onClick={prev}
              className="glass rounded-xl px-5 py-3 font-mono text-sm hover:ring-1 hover:ring-white/20"
            >
              prev
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-xl bg-white px-5 py-3 font-mono text-sm font-semibold text-black"
            >
              next
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
