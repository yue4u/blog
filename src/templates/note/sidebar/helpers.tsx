import React, { useState, useRef, useEffect } from "react"
import ResizeObserver from "resize-observer-polyfill"

export function usePrevious<T>(value: T):T {
  const ref = useRef<T>()
  useEffect(() => void (ref.current = value), [value])
  return ref.current
}

export function useMeasure(): [
  { ref: React.MutableRefObject<any> },
  typeof init
] {
  const init = { left: 0, top: 0, width: 0, height: 0 }
  const ref = useRef()
  const [bounds, set] = useState(init)
  const [ro] = useState(
    () => new ResizeObserver(([entry]) => set(entry.contentRect))
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return [{ ref }, bounds]
}
