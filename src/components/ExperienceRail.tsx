import { motion } from 'framer-motion'
import { experience } from '../data/resume'

const VERDICTS = ['PASS', 'PASS', 'PASS'] as const

export function ExperienceRail() {
  return (
    <section id="runs" className="relative py-24 md:py-32">
      <div className="mb-10 px-6 md:px-12">
        <p className="font-mono text-xs text-[var(--color-hot)]">02 / test runs</p>
        <h2 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">
          Experience as <span className="text-gradient">change-scoped</span> suites
        </h2>
        <p className="mt-4 max-w-xl text-white/50">
          Horizontal rail — each role is a test report with verdict, flows, and tech
          manifest.
        </p>
      </div>

      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 md:px-12 [scrollbar-width:thin]">
        {experience.map((job, index) => (
          <motion.article
            key={job.company}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={{ delay: index * 0.08 }}
            className="glass w-[min(88vw,520px)] shrink-0 snap-center rounded-3xl p-6 md:p-8"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="font-mono text-[10px] text-white/40">
                  suite_{String(index + 1).padStart(2, '0')}
                </div>
                <h3 className="mt-1 text-2xl font-bold">{job.company}</h3>
                <p className="text-[var(--color-cyan)]">{job.role}</p>
              </div>
              <span
                className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold ${
                  VERDICTS[index] === 'PASS'
                    ? 'bg-[var(--color-neon)]/15 text-[var(--color-neon)] ring-1 ring-[var(--color-neon)]/40'
                    : 'bg-[var(--color-amber)]/15 text-[var(--color-amber)]'
                }`}
              >
                {VERDICTS[index]}
              </span>
            </div>
            <p className="mt-2 font-mono text-xs text-white/45">
              {job.location} · {job.period}
            </p>

            <div className="mt-6 space-y-3">
              {job.highlights.slice(0, 4).map((h, i) => (
                <div key={h.slice(0, 40)} className="flex gap-3 text-sm text-white/65">
                  <span className="font-mono text-[var(--color-neon)]">
                    flow.{i + 1}
                  </span>
                  <span>{h}</span>
                </div>
              ))}
              {job.highlights.length > 4 && (
                <details className="group text-sm text-white/55">
                  <summary className="cursor-pointer font-mono text-xs text-[var(--color-cyan)]">
                    + {job.highlights.length - 4} more flows
                  </summary>
                  <div className="mt-3 space-y-2 pl-2">
                    {job.highlights.slice(4).map((h, i) => (
                      <p key={h.slice(0, 40)}>
                        <span className="font-mono text-white/30">
                          flow.{i + 5}{' '}
                        </span>
                        {h}
                      </p>
                    ))}
                  </div>
                </details>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-1.5">
              {job.technologies.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/50"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
