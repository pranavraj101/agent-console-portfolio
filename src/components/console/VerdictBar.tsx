import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import type { FlowStep } from '../../data/caseStudies'

const STEPS = [
  ['PROBLEM', 'problem'],
  ['CONSTRAINT', 'constraint'],
  ['DESIGN', 'design'],
  ['RESULT', 'result'],
] as const

type Props = {
  steps: FlowStep
}

export function VerdictBar({ steps }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5%' })

  return (
    <div
      ref={ref}
      className="grid gap-px border border-[var(--border)] bg-[var(--border)] md:grid-cols-4"
    >
      {STEPS.map(([label, key], i) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.1, duration: 0.45 }}
          className="bg-[var(--bg-elevated)] p-4 md:p-5"
        >
          <p className="font-mono text-[10px] tracking-widest text-[var(--accent)]">
            {label}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-body)]">
            {steps[key]}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
