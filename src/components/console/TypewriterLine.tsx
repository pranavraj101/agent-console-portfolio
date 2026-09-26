import { useEffect } from 'react'
import { useTypewriter } from '../../hooks/useTypewriter'
import { BlinkCursor } from './BlinkCursor'

type Props = {
  prefix?: string
  text: string
  active: boolean
  delay?: number
  onComplete?: () => void
}

export function TypewriterLine({
  prefix = '',
  text,
  active,
  delay = 0,
  onComplete,
}: Props) {
  const { output, done } = useTypewriter(text, { active, delay, speed: 14 })

  useEffect(() => {
    if (done && active) onComplete?.()
  }, [done, active, onComplete])

  if (!active) return null

  return (
    <span className="text-[var(--text-muted)]">
      {prefix}
      {output}
      {!done && <BlinkCursor />}
    </span>
  )
}
