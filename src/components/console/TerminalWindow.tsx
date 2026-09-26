import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
  className?: string
}

export function TerminalWindow({ title, children, className = '' }: Props) {
  return (
    <div
      className={`terminal-window overflow-hidden border border-[var(--border)] bg-[var(--bg-elevated)] ${className}`}
    >
      <div className="flex items-center justify-between border-b border-[var(--border)] px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--text-dim)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--text-dim)]" />
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]/80" />
        </div>
        <span className="font-mono text-[10px] text-[var(--text-muted)]">{title}</span>
        <span className="w-12" />
      </div>
      <div className="terminal-window-body relative p-4 md:p-5">{children}</div>
    </div>
  )
}
