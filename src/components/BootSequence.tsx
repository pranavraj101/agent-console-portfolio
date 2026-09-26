import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LINES = [
  '[forge] mounting jailed shell… ok',
  '[harness] wiring Playwright REPL tool… ok',
  '[orchestrator] injecting platform context… ok',
  '[subagent] change-scoped test plan ready',
  '[observability] SSE stream + screenshot sink… ok',
  '[verdict] policy loaded — no false fails',
  '>> operator: PRANAV_RAJ — SHIP',
]

type Props = {
  onComplete: () => void
  skipMotion: boolean
}

export function BootSequence({ onComplete, skipMotion }: Props) {
  const [visibleLines, setVisibleLines] = useState(skipMotion ? LINES.length : 0)
  const [done, setDone] = useState(skipMotion)

  useEffect(() => {
    if (skipMotion) {
      onComplete()
      return
    }
    if (visibleLines >= LINES.length) {
      const t = setTimeout(() => {
        setDone(true)
        onComplete()
      }, 650)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setVisibleLines((n) => n + 1), 380)
    return () => clearTimeout(t)
  }, [visibleLines, skipMotion, onComplete])

  if (skipMotion) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-end bg-[#020205] p-6 font-mono text-sm md:p-10"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 text-[var(--color-neon)]">
            LYZR-STYLE HARNESS // PORTFOLIO v0.9.1
          </div>
          <div className="space-y-2 text-[var(--color-cyan)]/90">
            {LINES.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02 }}
              >
                <span className="text-white/40">{String(i + 1).padStart(2, '0')}</span>{' '}
                {line}
              </motion.div>
            ))}
            {visibleLines < LINES.length && (
              <span className="inline-block h-4 w-2 animate-pulse bg-[var(--color-neon)]" />
            )}
          </div>
          <button
            type="button"
            onClick={() => {
              setVisibleLines(LINES.length)
              setDone(true)
              onComplete()
            }}
            className="mt-10 w-fit text-xs text-white/40 underline-offset-4 hover:text-white hover:underline"
          >
            skip boot →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
