import { motion } from 'framer-motion'
import { shippedProjects } from '../../data/projects'
import { StatusPill } from './StatusPill'
import { TerminalWindow } from './TerminalWindow'

export function ArtifactsPage() {
  return (
    <div className="flex min-h-0 flex-1 flex-col justify-center py-2">
      <TerminalWindow title="pranav@harness:~/artifacts">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]"
        >
          $ find . -mount github
        </motion.p>
        <h2 className="mt-2 font-mono text-lg text-[var(--text-heading)] md:text-xl">
          Source mounts
        </h2>
        <ul className="mt-4 max-h-[min(52vh,480px)] divide-y divide-[var(--border)] overflow-y-auto border border-[var(--border)] [scrollbar-width:thin]">
          {shippedProjects.map((p, i) => (
            <motion.li
              key={p.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.04 }}
              className="flex flex-col gap-2 bg-[var(--bg)] p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <StatusPill status="PASS" />
                  <span className="truncate font-mono text-sm text-[var(--text-heading)]">
                    {p.name}
                  </span>
                </div>
                <p className="mt-1 line-clamp-2 text-xs text-[var(--text-muted)]">
                  {p.description}
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2">
                {p.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="border border-[var(--border)] px-2 py-1 font-mono text-[10px] text-[var(--accent)] hover:bg-[var(--accent)]/10"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </motion.li>
          ))}
        </ul>
      </TerminalWindow>
    </div>
  )
}
