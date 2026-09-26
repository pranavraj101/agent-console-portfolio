import type { VerdictStatus } from '../../data/caseStudies'

export type { VerdictStatus }

const config: Record<
  VerdictStatus,
  { symbol: string; className: string }
> = {
  PASS: {
    symbol: '●',
    className: 'text-[var(--status-pass)] border-[var(--status-pass)]/35',
  },
  SKIPPED: {
    symbol: '○',
    className: 'text-[var(--text-muted)] border-[var(--border)]',
  },
  RUNNING: {
    symbol: '◐',
    className: 'text-[var(--accent)] border-[var(--accent)]/35',
  },
}

type Props = {
  status: VerdictStatus
  className?: string
}

export function StatusPill({ status, className = '' }: Props) {
  const c = config[status]
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${c.className} ${className}`}
    >
      <span aria-hidden>{c.symbol}</span>
      {status}
    </span>
  )
}
