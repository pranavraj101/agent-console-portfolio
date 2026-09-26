import { motion } from 'framer-motion'

type PageMeta = { id: string; label: string }

type Props = {
  pages: PageMeta[]
  active: number
  onSelect: (index: number) => void
}

export function PageIndicator({ pages, active, onSelect }: Props) {
  return (
    <div className="pointer-events-none fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2 md:bottom-6">
      <motion.p
        animate={{ opacity: [0.35, 0.85, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]"
      >
        scroll · swipe · ↑↓
      </motion.p>
      <div className="pointer-events-auto flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)]/90 px-3 py-2 backdrop-blur-sm">
        <span className="font-mono text-[10px] text-[var(--text-muted)]">
          {String(active + 1).padStart(2, '0')}/{String(pages.length).padStart(2, '0')}
        </span>
        <div className="flex gap-1.5">
          {pages.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-label={`Go to ${p.label}`}
              onClick={() => onSelect(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active
                  ? 'w-6 bg-[var(--accent)]'
                  : 'w-1.5 bg-[var(--text-dim)] hover:bg-[var(--text-muted)]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
