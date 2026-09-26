import type { SectionId } from '../hooks/useActiveSection'

type Props = {
  active: SectionId
  bootComplete: boolean
}

export function TopTelemetry({ active, bootComplete }: Props) {
  if (!bootComplete) return null

  return (
    <header className="fixed top-0 z-40 w-full border-b border-white/5 bg-[#030308]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 font-mono text-[10px] text-white/45 md:text-xs">
        <span>HARNESS :: PRANAV_RAJ</span>
        <span className="hidden sm:inline">sector={active}</span>
        <span className="text-[var(--color-neon)]">● LIVE</span>
      </div>
    </header>
  )
}
