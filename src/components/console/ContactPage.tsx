import { motion } from 'framer-motion'
import { TerminalFooter } from './TerminalFooter'

export function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="flex min-h-0 flex-1 flex-col justify-center py-2"
    >
      <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
        $ open shell --contact
      </p>
      <TerminalFooter />
    </motion.div>
  )
}
