import React, { useEffect, useRef, useState } from 'react'
import ASScroll from '@ashthornton/asscroll'
import './scroller.scss'

const initialState = {
  targetPos: 0,
  currentPos: 0,
  maxScroll: 0,
  scrollEnd: 0,
  scrollPercent: null
}

const asscrollOptions = {
  ease: 0.1,
  touchEase: 1,
  customScrollbar: true,
  scrollbarStyles: true,
  disableNativeScrollbar: true,
  touchScrollType: 'scrollTop',
  disableRaf: true,
  disableResize: false,
  limitLerpRate: true
}

const Scroller = ({ children, handleStateChange }) => {
  const asscrollRef = useRef(null)
  const [state, setState] = useState({ ...initialState })
  const stateRef = useRef({ ...initialState }) // we need to record this in real-time to prevent a setState infinity loop

  function onChange (newState) {
    stateRef.current = {
      ...stateRef.current,
      ...newState
    }
    setState({ ...stateRef.current })
    handleStateChange(stateRef.current)
  }

  function onRaf () {
    if (asscrollRef.current === null) return
    asscrollRef.current.update()
    window.requestAnimationFrame(onRaf)
  }

  function onResize () {
    if (asscrollRef.current === null) return

    const width = window.innerWidth
    const height = window.innerHeight
    asscrollRef.current.resize({ width, height })
    onChange({ maxScroll: asscrollRef.current.maxScroll })
  }

  useEffect(() => {
    if (asscrollRef.current === null) {
      asscrollRef.current = new ASScroll(asscrollOptions)

      asscrollRef.current.on('scroll', scrollPos =>
        onChange({ targetPos: scrollPos })
      )

      asscrollRef.current.on('scrollEnd', scrollPos =>
        onChange({ scrollEnd: scrollPos })
      )

      asscrollRef.current?.on('update', ({ currentPos }) => {
        if (stateRef.current.currentPos === currentPos) return

        const scrollPercent = Math.ceil(
          (100 / asscrollRef.current.maxScroll) * currentPos
        )

        stateRef.current.currentPos = currentPos
        onChange({ currentPos, scrollPercent })
      })

      window.requestAnimationFrame(onRaf)

      window.addEventListener('resize', onResize)

      asscrollRef.current.enable()

      onChange({ maxScroll: asscrollRef.current.maxScroll })
    }

    return () => {
      asscrollRef.current.disable()
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div asscroll-container='true'>
      {children}
      <div className='properties'>
        <pre>targetPos: {state.targetPos}</pre>
        <pre>currentPos: {state.currentPos}</pre>
        <pre>maxScroll: {state.maxScroll}</pre>
        <pre>scrollEnd: {state.scrollEnd}</pre>
        <pre>scrollPercent: {state.scrollPercent}</pre>
      </div>
    </div>
  )
}

export default Scroller
