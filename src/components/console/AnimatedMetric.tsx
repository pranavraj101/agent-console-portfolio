import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Props = {
  value: string
  label: string
}

export function AnimatedMetric({ value, label }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduced = usePrefersReducedMotion()
  const numeric = /^\d+$/.test(value)
  const target = numeric ? parseInt(value, 10) : null
  const [display, setDisplay] = useState(reduced || !numeric ? value : '0')

  useEffect(() => {
    if (!inView || !numeric || target === null || reduced) return
    let frame = 0
    const duration = 900
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - (1 - t) ** 3
      setDisplay(String(Math.round(target * eased)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, numeric, target, reduced, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 8 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4 }}
      className="bg-[var(--bg-elevated)] px-4 py-3"
    >
      <p className="font-mono text-lg text-[var(--text-heading)] md:text-xl">{display}</p>
      <p className="font-mono text-[10px] uppercase tracking-wide text-[var(--text-muted)]">
        {label}
      </p>
    </motion.div>
  )
}
