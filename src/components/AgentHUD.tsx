import { motion } from 'framer-motion'
import { sectionNarration } from '../data/narration'
import type { SectionId } from '../hooks/useActiveSection'

type Props = {
  active: SectionId
}

export function AgentHUD({ active }: Props) {
  const lines = sectionNarration[active] ?? sectionNarration.hero

  return (
    <div className="pointer-events-none fixed bottom-24 left-4 z-40 max-w-md md:bottom-8 md:left-8">
      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-xl px-4 py-3 font-mono text-[11px] leading-relaxed md:text-xs"
      >
        <div className="mb-2 flex items-center gap-2 text-[var(--color-neon)]">
          <span className="relative pulse-dot inline-block h-2 w-2 rounded-full bg-[var(--color-neon)]" />
          subagent / narrator
        </div>
        {lines.map((line) => (
          <p key={line} className="text-white/75">
            › {line}
          </p>
        ))}
      </motion.div>
    </div>
  )
}
