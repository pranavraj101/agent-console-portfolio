type Props = {
  className?: string
}

export function BlinkCursor({ className = '' }: Props) {
  return (
    <span
      className={`terminal-cursor ml-0.5 inline-block h-[1em] w-[0.55em] translate-y-[0.12em] bg-[var(--accent)] ${className}`}
      aria-hidden
    />
  )
}
