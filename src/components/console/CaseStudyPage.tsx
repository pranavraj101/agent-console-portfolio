import { motion } from 'framer-motion'
import type { CaseStudy } from '../../data/caseStudies'
import { ActivityLog } from './ActivityLog'
import { StatusPill } from './StatusPill'
import { SystemDiagram } from './SystemDiagram'
import { VerdictBar } from './VerdictBar'

type Props = {
  study: CaseStudy
  index: number
  total: number
}

export function CaseStudyPage({ study, index, total }: Props) {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="mb-3 flex items-center justify-between gap-3"
      >
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          $ run case_study/{study.id} · {index + 1}/{total}
        </p>
        <StatusPill status={study.status} />
      </motion.div>

      <article className="border border-[var(--border)]">
        <div className="border-b border-[var(--border)] bg-[var(--bg-elevated)] px-4 py-3 md:px-5">
          <h2 className="font-mono text-base text-[var(--text-heading)] md:text-lg">
            {study.title}
          </h2>
          <p className="mt-1 font-mono text-[11px] text-[var(--text-muted)]">
            {study.subtitle}
          </p>
        </div>

        <div className="max-h-[min(58vh,520px)] overflow-y-auto p-4 md:p-5 [scrollbar-width:thin]">
          <VerdictBar steps={study.steps} />

          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <SystemDiagram nodes={study.nodes} edges={study.edges} />
            <ActivityLog lines={study.activityLog} />
          </div>

          <div className="mt-4 space-y-2 font-mono text-xs leading-relaxed md:text-sm">
            {study.narrative.map((p, i) => (
              <motion.p
                key={p.slice(0, 40)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.07 }}
              >
                <span className="text-[var(--text-dim)]">{'>'}</span> {p}
              </motion.p>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {study.tags.map((t) => (
              <span
                key={t}
                className="border border-[var(--border)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </article>
    </div>
  )
}
