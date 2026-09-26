import { useEffect, useState } from 'react'

const SECTION_IDS = [
  'hero',
  'signal',
  'runs',
  'builds',
  'stack',
  'edu',
  'comms',
] as const

export type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection() {
  const [active, setActive] = useState<SectionId>('hero')

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target.id) {
          setActive(visible.target.id as SectionId)
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return active
}
