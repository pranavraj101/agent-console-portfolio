import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { BlinkCursor } from './BlinkCursor'

const BOOT_LINES = [
  'agent_console v1.0 · observability shell',
  '[ok] mount harness modules',
  '[ok] load verdict policy · never_false_fail=true',
  '[ok] connect sse stream · buffered',
  'ready — type `scroll` or press any key to continue',
]

const STORAGE_KEY = 'agent_console_boot_v1'

type Props = {
  onDone: () => void
}

export function TerminalBoot({ onDone }: Props) {
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false
    if (reduced) return false
    return !sessionStorage.getItem(STORAGE_KEY)
  })
  const [lineCount, setLineCount] = useState(reduced ? BOOT_LINES.length : 0)

  const finish = () => {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
    onDone()
  }

  useEffect(() => {
    if (reduced) {
      onDone()
      return
    }
    if (!visible) {
      onDone()
      return
    }

    if (lineCount >= BOOT_LINES.length) {
      const t = setTimeout(finish, 900)
      return () => clearTimeout(t)
    }

    const t = setTimeout(() => setLineCount((n) => n + 1), 420)
    return () => clearTimeout(t)
  }, [visible, lineCount, reduced, onDone])

  useEffect(() => {
    if (!visible) return
    const onKey = () => finish()
    window.addEventListener('keydown', onKey)
    window.addEventListener('click', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('click', onKey)
    }
  }, [visible])

  if (!visible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-end bg-[var(--bg)] p-6 font-mono text-sm md:items-center md:p-12"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="mx-auto w-full max-w-2xl border border-[var(--border)] bg-[var(--bg-elevated)] p-5 md:p-8">
          <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
            boot sequence
          </p>
          <div className="mt-4 space-y-2 text-[var(--text-body)]">
            {BOOT_LINES.slice(0, lineCount).map((line) => (
              <motion.p
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
              >
                <span className="text-[var(--accent)]">›</span> {line}
              </motion.p>
            ))}
            {lineCount < BOOT_LINES.length && <BlinkCursor />}
          </div>
          <button
            type="button"
            onClick={finish}
            className="mt-8 text-[11px] text-[var(--text-dim)] hover:text-[var(--accent)]"
          >
            skip →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
