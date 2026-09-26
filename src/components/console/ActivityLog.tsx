import { useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { BlinkCursor } from './BlinkCursor'

type Props = {
  lines: string[]
}

function TypingRow({
  index,
  line,
  onComplete,
}: {
  index: number
  line: string
  onComplete: () => void
}) {
  const { output, done } = useTypewriter(line, { active: true, speed: 12 })

  useEffect(() => {
    if (done) onComplete()
  }, [done, onComplete])

  return (
    <li className="text-[var(--text-muted)]">
      <span className="text-[var(--text-dim)]">{String(index + 1).padStart(2, '0')}:</span>{' '}
      {output}
      {!done && <BlinkCursor />}
    </li>
  )
}

export function ActivityLog({ lines }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8%' })
  const reduced = usePrefersReducedMotion()
  const [doneCount, setDoneCount] = useState(reduced ? lines.length : 0)

  useEffect(() => {
    if (inView && reduced) setDoneCount(lines.length)
  }, [inView, reduced, lines.length])

  return (
    <div
      ref={ref}
      className="border border-[var(--border)] bg-[var(--bg)] font-mono text-[11px] leading-relaxed md:text-xs"
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
        <span className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
          tail -f activity.log
        </span>
        <span className="animate-pulse text-[10px] text-[var(--accent)]">LIVE</span>
      </div>
      <ol className="max-h-52 overflow-y-auto p-3 [scrollbar-width:thin]">
        {lines.slice(0, doneCount).map((line, i) => (
          <li key={line} className="text-[var(--text-muted)]">
            <span className="text-[var(--text-dim)]">{String(i + 1).padStart(2, '0')}:</span>{' '}
            {line}
          </li>
        ))}
        {inView && !reduced && doneCount < lines.length && (
          <TypingRow
            key={doneCount}
            index={doneCount}
            line={lines[doneCount]}
            onComplete={() => setDoneCount((c) => c + 1)}
          />
        )}
      </ol>
    </div>
  )
}
