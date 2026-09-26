import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

const WHEEL_COOLDOWN_MS = 900

export function usePagedNavigation(pageCount: number) {
  const reduced = usePrefersReducedMotion()
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState(1)
  const contentRef = useRef<HTMLDivElement>(null)
  const locked = useRef(false)
  const touchY = useRef<number | null>(null)

  const goTo = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(pageCount - 1, index))
      if (next === page) return
      setDirection(next > page ? 1 : -1)
      setPage(next)
      contentRef.current?.scrollTo({ top: 0 })
    },
    [page, pageCount],
  )

  const goNext = useCallback(() => goTo(page + 1), [goTo, page])
  const goPrev = useCallback(() => goTo(page - 1), [goTo, page])

  const canLeavePage = useCallback((deltaY: number) => {
    const el = contentRef.current
    if (!el || el.scrollHeight <= el.clientHeight + 4) return true
    const atTop = el.scrollTop <= 0
    const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
    if (deltaY > 0) return atBottom
    return atTop
  }, [])

  useEffect(() => {
    const unlock = () => {
      locked.current = false
    }

    const onWheel = (e: WheelEvent) => {
      if (reduced) return
      if (!canLeavePage(e.deltaY)) return
      if (Math.abs(e.deltaY) < 24) return
      if (locked.current) {
        e.preventDefault()
        return
      }
      e.preventDefault()
      locked.current = true
      if (e.deltaY > 0) goNext()
      else goPrev()
      setTimeout(unlock, WHEEL_COOLDOWN_MS)
    }

    window.addEventListener('wheel', onWheel, { passive: false })
    return () => window.removeEventListener('wheel', onWheel)
  }, [canLeavePage, goNext, goPrev, reduced])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault()
        goNext()
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchY.current = e.touches[0]?.clientY ?? null
    }
    const onTouchEnd = (e: TouchEvent) => {
      if (touchY.current === null) return
      const endY = e.changedTouches[0]?.clientY ?? touchY.current
      const delta = touchY.current - endY
      touchY.current = null
      if (Math.abs(delta) < 56) return
      const fakeDeltaY = delta > 0 ? 100 : -100
      if (!canLeavePage(fakeDeltaY)) return
      if (delta > 0) goNext()
      else goPrev()
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [canLeavePage, goNext, goPrev])

  return { page, direction, goTo, goNext, goPrev, contentRef, pageCount }
}
