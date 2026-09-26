import { useEffect, useState } from 'react'
import { dashboardMetrics } from '../../data/caseStudies'
import { profile } from '../../data/resume'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { AnimatedMetric } from './AnimatedMetric'
import { BlinkCursor } from './BlinkCursor'
import { TerminalWindow } from './TerminalWindow'

type Step =
  | { kind: 'cmd'; text: string }
  | { kind: 'out'; text: string; accent?: boolean }

const SEQUENCE: Step[] = [
  { kind: 'cmd', text: 'whoami' },
  { kind: 'out', text: 'pranav_raj', accent: true },
  { kind: 'cmd', text: 'cat role.txt' },
  { kind: 'out', text: profile.title, accent: true },
  { kind: 'cmd', text: 'echo $BUILD_FOCUS' },
  { kind: 'out', text: profile.tagline },
]

export function HeroTerminal() {
  const reduced = usePrefersReducedMotion()
  const [stepIndex, setStepIndex] = useState(reduced ? SEQUENCE.length : 0)
  const [phase, setPhase] = useState<'cmd' | 'out' | 'done'>(reduced ? 'done' : 'cmd')

  const current = SEQUENCE[stepIndex]
  const cmdText = current?.kind === 'cmd' ? current.text : ''
  const { output, done } = useTypewriter(cmdText, {
    active: !reduced && phase === 'cmd' && current?.kind === 'cmd',
    speed: 22,
  })

  useEffect(() => {
    if (reduced || stepIndex >= SEQUENCE.length) {
      setPhase('done')
      return
    }

    const step = SEQUENCE[stepIndex]
    if (!step) return

    if (step.kind === 'cmd') {
      if (phase !== 'cmd') setPhase('cmd')
      if (done) {
        const t = setTimeout(() => {
          setStepIndex((i) => i + 1)
          setPhase('out')
        }, 300)
        return () => clearTimeout(t)
      }
      return
    }

    if (step.kind === 'out' && phase === 'out') {
      const t = setTimeout(() => {
        setStepIndex((i) => i + 1)
        setPhase('cmd')
      }, 600)
      return () => clearTimeout(t)
    }
  }, [stepIndex, phase, done, reduced])

  const completed = SEQUENCE.slice(0, stepIndex)

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
      <TerminalWindow title="pranav@harness:~/console">
        <div className="space-y-2 font-mono text-sm md:text-base">
          {completed.map((step, i) =>
            step.kind === 'cmd' ? (
              <p key={`${i}-cmd`} className="text-[var(--text-muted)]">
                <span className="text-[var(--accent)]">$</span> {step.text}
              </p>
            ) : (
              <p
                key={`${i}-out`}
                className={
                  step.accent ? 'text-[var(--text-heading)]' : 'text-[var(--text-body)]'
                }
              >
                {step.text}
              </p>
            ),
          )}

          {!reduced && stepIndex < SEQUENCE.length && current && (
            <>
              {current.kind === 'cmd' && phase === 'cmd' && (
                <p className="text-[var(--text-muted)]">
                  <span className="text-[var(--accent)]">$</span> {output}
                  {!done && <BlinkCursor />}
                </p>
              )}
              {current.kind === 'out' && phase === 'out' && (
                <p
                  className={
                    current.accent
                      ? 'text-[var(--text-heading)]'
                      : 'text-[var(--text-body)]'
                  }
                >
                  {current.text}
                  <BlinkCursor />
                </p>
              )}
            </>
          )}

          {(phase === 'done' || reduced) && (
            <>
              <h1 className="mt-4 text-2xl text-[var(--text-heading)] md:text-3xl">
                {profile.name}
              </h1>
              <p className="mt-3 font-mono text-xs">
                <span className="text-[var(--accent)]">$</span> open resume.pdf{' '}
                <a
                  href={profile.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--text-heading)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
                >
                  view on Google Drive ↗
                </a>
              </p>
            </>
          )}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-px border border-[var(--border)] bg-[var(--border)] sm:grid-cols-4">
          {dashboardMetrics.map((m) => (
            <AnimatedMetric key={m.label} value={m.value} label={m.label} />
          ))}
        </div>

        <p className="mt-6 font-mono text-xs text-[var(--text-dim)]">
          <span className="text-[var(--accent)]">$</span> watch metrics --live
          <span className="ml-2 text-[var(--status-pass)]">● streaming</span>
        </p>
      </TerminalWindow>
    </div>
  )
}
