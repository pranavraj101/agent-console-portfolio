import { motion } from 'framer-motion'
import { education, experience } from '../../data/resume'

export function ExperiencePage() {
  const lyzr = experience[0]

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        $ cat experience.log
      </p>
      <div className="max-h-[min(62vh,560px)] space-y-4 overflow-y-auto pr-1 [scrollbar-width:thin]">
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
        >
          <div className="flex flex-wrap justify-between gap-2">
            <h2 className="font-mono text-base text-[var(--text-heading)]">{lyzr.company}</h2>
            <span className="font-mono text-[11px] text-[var(--text-muted)]">{lyzr.period}</span>
          </div>
          <p className="mt-1 text-sm text-[var(--accent)]">{lyzr.role}</p>
          <ul className="mt-3 space-y-1.5 border-l border-[var(--border)] pl-3 font-mono text-xs text-[var(--text-muted)] md:text-sm">
            {lyzr.highlights.slice(0, 5).map((h) => (
              <li key={h.slice(0, 48)}>
                <span className="text-[var(--text-dim)]">~</span> {h}
              </li>
            ))}
          </ul>
        </motion.article>

        {experience.slice(1).map((job, i) => (
          <motion.article
            key={job.company}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="border border-[var(--border)] bg-[var(--bg-elevated)] p-4"
          >
            <div className="flex flex-wrap justify-between gap-2">
              <h3 className="font-mono text-sm text-[var(--text-heading)]">{job.company}</h3>
              <span className="font-mono text-[10px] text-[var(--text-muted)]">{job.period}</span>
            </div>
            <p className="mt-1 text-xs text-[var(--accent)]">{job.role}</p>
            <ul className="mt-2 space-y-1 font-mono text-xs text-[var(--text-muted)]">
              {job.highlights.slice(0, 2).map((h) => (
                <li key={h.slice(0, 40)}>{h}</li>
              ))}
            </ul>
          </motion.article>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="border border-[var(--border)] bg-[var(--bg-elevated)] p-4 font-mono"
        >
          <p className="text-[10px] uppercase text-[var(--text-muted)]">education</p>
          <p className="mt-1 text-sm text-[var(--text-heading)]">{education.school}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {education.degree} · GPA {education.gpa}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
