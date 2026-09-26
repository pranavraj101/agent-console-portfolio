import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

export function useTypewriter(
  text: string,
  options: { speed?: number; active?: boolean; delay?: number } = {},
) {
  const { speed = 18, active = true, delay = 0 } = options
  const reduced = usePrefersReducedMotion()
  const [output, setOutput] = useState(reduced ? text : '')
  const [done, setDone] = useState(reduced)

  useEffect(() => {
    if (reduced) {
      setOutput(text)
      setDone(true)
      return
    }
    if (!active) {
      setOutput('')
      setDone(false)
      return
    }

    setOutput('')
    setDone(false)
    let index = 0
    let interval: ReturnType<typeof setInterval> | undefined

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        index += 1
        setOutput(text.slice(0, index))
        if (index >= text.length) {
          clearInterval(interval)
          setDone(true)
        }
      }, speed)
    }, delay)

    return () => {
      clearTimeout(timeout)
      if (interval) clearInterval(interval)
    }
  }, [text, speed, active, delay, reduced])

  return { output, done }
}
