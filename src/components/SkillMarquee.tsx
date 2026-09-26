import { skills } from '../data/resume'

function MarqueeRow({
  items,
  reverse,
  accent,
}: {
  items: readonly string[]
  reverse?: boolean
  accent: string
}) {
  const doubled = [...items, ...items]
  return (
    <div className="overflow-hidden border-y border-white/10 py-4">
      <div className={`marquee-track gap-8 ${reverse ? 'marquee-track-reverse' : ''}`}>
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="shrink-0 font-mono text-sm md:text-base"
            style={{ color: accent }}
          >
            {item}
            <span className="mx-8 text-white/20">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export function SkillMarquee() {
  return (
    <section id="stack" className="relative py-24 md:py-32">
      <div className="px-6 md:px-12">
        <p className="font-mono text-xs text-[var(--color-hot)]">04 / stack</p>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Skill manifest streams</h2>
      </div>
      <div className="mt-12 space-y-2">
        <MarqueeRow items={skills.languages} accent="var(--color-neon)" />
        <MarqueeRow items={skills.frameworks} reverse accent="var(--color-cyan)" />
        <MarqueeRow items={skills.infra} accent="var(--color-amber)" />
      </div>
    </section>
  )
}
