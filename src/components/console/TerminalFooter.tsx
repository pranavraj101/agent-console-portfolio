import { useEffect, useState } from 'react'
import { profile } from '../../data/resume'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTypewriter } from '../../hooks/useTypewriter'
import { BlinkCursor } from './BlinkCursor'

const lines = [
  { cmd: 'contact --email', value: profile.email, href: `mailto:${profile.email}` },
  { cmd: 'open resume.pdf', value: 'Google Drive ↗', href: profile.resume },
  { cmd: 'contact --github', value: 'pranavraj101', href: profile.github },
  { cmd: 'contact --linkedin', value: 'pranav-raj', href: profile.linkedin },
]

function StaticLine({ line }: { line: (typeof lines)[0] }) {
  return (
    <p className="text-[var(--text-muted)]">
      <span className="text-[var(--accent)]">$</span> {line.cmd}{' '}
      {line.href ? (
        <a
          href={line.href}
          target={line.href.startsWith('mailto') ? undefined : '_blank'}
          rel="noreferrer"
          className="text-[var(--text-heading)] underline-offset-2 hover:text-[var(--accent)] hover:underline"
        >
          {line.value}
        </a>
      ) : (
        <span className="text-[var(--text-heading)]">{line.value}</span>
      )}
    </p>
  )
}

function TypingCommand({
  line,
  onDone,
}: {
  line: (typeof lines)[0]
  onDone: () => void
}) {
  const full = `${line.cmd} ${line.value}`
  const { output, done } = useTypewriter(full, { active: true, speed: 16 })

  useEffect(() => {
    if (done) onDone()
  }, [done, onDone])

  return (
    <p className="text-[var(--text-muted)]">
      <span className="text-[var(--accent)]">$</span> {output}
      {!done && <BlinkCursor />}
    </p>
  )
}

export function TerminalFooter() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(reduced ? lines.length : 0)

  return (
    <div className="border border-[var(--border)] bg-[var(--bg-elevated)] p-5 font-mono text-sm md:p-6">
      <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        interactive shell
      </p>
      <div className="mt-4 min-h-[120px] space-y-2">
        {lines.slice(0, index).map((line) => (
          <StaticLine key={line.cmd} line={line} />
        ))}
        {!reduced && index < lines.length && (
          <TypingCommand
            key={lines[index].cmd}
            line={lines[index]}
            onDone={() => setIndex((i) => i + 1)}
          />
        )}
        {(reduced || index >= lines.length) && (
          <p className="text-[var(--text-muted)]">
            <span className="text-[var(--accent)]">$</span>
            <BlinkCursor />
          </p>
        )}
      </div>
      <p className="mt-6 text-[11px] text-[var(--text-dim)]">
        // agent_console · awaiting input
      </p>
    </div>
  )
}
