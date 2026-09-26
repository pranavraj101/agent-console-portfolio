import { motion } from 'framer-motion'
import type { SectionId } from '../hooks/useActiveSection'

const COMMANDS: { id: SectionId; label: string }[] = [
  { id: 'hero', label: 'home' },
  { id: 'signal', label: 'about' },
  { id: 'runs', label: 'experience' },
  { id: 'builds', label: 'projects' },
  { id: 'stack', label: 'skills' },
  { id: 'edu', label: 'edu' },
  { id: 'comms', label: 'contact' },
]

type Props = {
  active: SectionId
}

export function CommandDock({ active }: Props) {
  return (
    <nav
      className="fixed bottom-4 left-1/2 z-50 w-[min(96vw,720px)] -translate-x-1/2"
      aria-label="Section navigation"
    >
      <div className="glass flex items-center gap-1 overflow-x-auto rounded-2xl p-1.5 font-mono text-[10px] md:text-xs">
        <span className="hidden shrink-0 px-2 text-[var(--color-cyan)] sm:inline">
          harness&gt;
        </span>
        {COMMANDS.map((cmd) => {
          const isActive = active === cmd.id
          return (
            <a
              key={cmd.id}
              href={`#${cmd.id}`}
              className="relative shrink-0 rounded-xl px-3 py-2 text-white/60 transition hover:text-white"
            >
              {isActive && (
                <motion.span
                  layoutId="dock-pill"
                  className="absolute inset-0 rounded-xl bg-white/10 ring-1 ring-[var(--color-neon)]/40"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{cmd.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
