import { useEffect, useState } from 'react'

const MODES = ['confined', 'dev', 'strict'] as const

function randomSession() {
  return `ses_${Math.random().toString(36).slice(2, 10)}`
}

export function SandboxChrome() {
  const [session] = useState(randomSession)
  const [modeIndex, setModeIndex] = useState(0)
  const [uptime, setUptime] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setUptime((u) => u + 1), 1000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(
      () => setModeIndex((i) => (i + 1) % MODES.length),
      8000,
    )
    return () => clearInterval(t)
  }, [])

  const mode = MODES[modeIndex]

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] flex justify-between border-b border-[#4fd1ff]/20 bg-[#050508]/85 px-4 py-2 font-[family-name:var(--font-mono)] text-[9px] uppercase tracking-wider text-white/50 backdrop-blur-md md:px-6 md:text-[10px]">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="text-[#4fd1ff]">forge/harness</span>
          <span>session={session}</span>
          <span className="text-[#34d399]">mode={mode}</span>
          <span className="hidden sm:inline">jail=non-root</span>
          <span className="hidden md:inline">broker=install.v1</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[#fbbf24]">uptime {uptime}s</span>
          <span className="relative flex items-center gap-1.5 text-[#34d399]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#34d399]" />
            vm live
          </span>
        </div>
      </div>

      <div className="pointer-events-none fixed right-3 top-14 z-[55] hidden w-36 border border-white/10 bg-black/50 p-2 font-[family-name:var(--font-mono)] text-[9px] text-white/45 backdrop-blur md:block">
        <div className="mb-1 text-[#a78bfa]">cgroup metrics</div>
        <Metric label="cpu" value={12 + (uptime % 7)} max={100} />
        <Metric label="mem mb" value={420 + (uptime % 40)} max={512} />
        <Metric label="sse buf" value={3 + (uptime % 5)} max={16} />
        <div className="mt-2 border-t border-white/10 pt-2 text-white/30">
          manifest sha256:…{session.slice(-6)}
        </div>
      </div>

      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-[54] w-1 bg-[repeating-linear-gradient(180deg,#fbbf24_0,#fbbf24_8px,transparent_8px,transparent_16px)] opacity-30"
        aria-hidden
      />
    </>
  )
}

function Metric({
  label,
  value,
  max,
}: {
  label: string
  value: number
  max: number
}) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className="mt-1">
      <div className="flex justify-between">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="mt-0.5 h-1 bg-white/10">
        <div
          className="h-full bg-[#4fd1ff]/70 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
