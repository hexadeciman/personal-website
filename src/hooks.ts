import { useSpring } from 'react-spring'
import { useState, useEffect, useCallback } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

interface Bounds {
  left: number
  top: number
  width: number
  height: number
}
const initialBounds: Bounds = { left: 0, top: 0, width: 0, height: 0 }
function useBoundingClientRect(ref: React.RefObject<HTMLDivElement>): Bounds {
  const [bounds, set] = useState<Bounds>(initialBounds)
  const [ro] = useState(
    () =>
      new ResizeObserver(([entry]: ResizeObserverEntry[]) =>
        set(entry.target.getBoundingClientRect())
      )
  )
  useEffect(() => {
    if (ref.current) ro.observe(ref.current)
    return () => ro.disconnect()
  }, [])
  return bounds
}

export const use3dEffect = (
  ref: React.RefObject<HTMLDivElement>,
  glowRef: React.RefObject<HTMLDivElement>,
  animationDone: boolean
): {
  style: React.CSSProperties
  styleGlow: React.CSSProperties
  onMouseLeave: () => void
  onMouseEnter: (event: React.MouseEvent) => void
} => {
  const [props, set] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 100 }
  }))

  const [props2, set2] = useSpring(() => ({
    xys: [0, 0, 1],
    config: { mass: 5, tension: 350, friction: 100 }
  }))

  const { top, left, width, height } = useBoundingClientRect(ref)

  const calc = useCallback(
    (x: number, y: number): number[] => [
      -((top + height / 2 - y) / (height / 2)) * 10,
      -((left + width / 2 - x) / (width / 2)) * 10,
      1
    ],
    [height, left, top, width]
  )
  const trans = (x: number, y: number, s: number): string =>
    `perspective(1000px) rotateX(${x}deg) rotateY(${-y}deg) scale(${s})`
  const glow = (x: number, y: number): string =>
    `radial-gradient(
        circle at
        ${x + 220 - width / 2}px
        ${y + 220 - height / 2}px,
        #ffffff50,
        #ffffff00,
        #ffffff00
      )`

  const onMouseMoveCB = useCallback(
    (x: number, y: number) => {
      set({ xys: calc(x, y) })
      set2({ xys: [x, y, 1] })
    },
    [calc, set, set2]
  )
  return {
    style: {
      // @ts-ignore
      transform: props.xys.to(trans)
    },
    styleGlow: {
      // @ts-ignore
      backgroundImage: props2.xys.to(glow)
    },
    onMouseLeave: () => set({ xys: [0, 0, 1] }),
    // @ts-ignore
    onMouseMove: ({ pageX: x, pageY: y }: React.MouseEvent) =>
      animationDone ? onMouseMoveCB(x, y) : () => null
  }
}
