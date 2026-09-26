import { useScroll } from '@react-three/drei'
import { useEffect, useState } from 'react'

const BASE = [
  '[broker] whitelisted pip install — timeout 120s',
  '[jail] uid=65534 gid=65534 cap_drop=ALL',
  '[harness] playwright repl attached — code-as-actions',
  '[subagent] budget=bounded scope=changed_files',
  '[verdict] never_false_fail=true',
  '[sse] event: step narration + screenshot artifact',
  '[tenant] provider filter @ claim + bake',
]

/** Must render under ScrollControls (e.g. inside HtmlScroll). */
export function ForgeLog() {
  const scroll = useScroll()
  const [lines, setLines] = useState<string[]>(BASE.slice(0, 3))

  useEffect(() => {
    const idx = Math.min(
      BASE.length,
      2 + Math.floor(scroll.offset * BASE.length * 1.2),
    )
    setLines(BASE.slice(0, idx))
  }, [scroll.offset])

  return (
    <div className="pointer-events-none fixed bottom-6 left-4 z-[58] hidden max-w-sm md:block">
      <div className="border border-[#34d399]/25 bg-black/70 p-3 font-[family-name:var(--font-mono)] text-[10px] leading-relaxed text-[#34d399]/90 backdrop-blur-md">
        <div className="mb-2 text-white/40">/var/log/forge/session.log</div>
        {lines.map((line) => (
          <div key={line} className="truncate">
            <span className="text-white/25">
              {new Date().toISOString().slice(11, 19)}
            </span>{' '}
            {line}
          </div>
        ))}
        <span className="mt-1 inline-block h-3 w-2 animate-pulse bg-[#34d399]/80" />
      </div>
    </div>
  )
}
