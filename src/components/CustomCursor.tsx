import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const move = (e: MouseEvent) => {
      if (dot.current) {
        dot.current.style.left = `${e.clientX}px`
        dot.current.style.top = `${e.clientY}px`
      }
      if (ring.current) {
        ring.current.style.left = `${e.clientX}px`
        ring.current.style.top = `${e.clientY}px`
      }
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('a, button, summary, [data-cursor="hover"]')) {
        ring.current?.classList.add('hover')
      }
    }
    const out = () => ring.current?.classList.remove('hover')

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <div
        ref={dot}
        className="cursor-dot pointer-events-none fixed z-[200] hidden h-2 w-2 rounded-full bg-[#4fd1ff] md:block"
        aria-hidden
      />
      <div
        ref={ring}
        className="cursor-ring pointer-events-none fixed z-[199] hidden h-9 w-9 rounded-full border border-white/40 md:block"
        aria-hidden
      />
    </>
  )
}
