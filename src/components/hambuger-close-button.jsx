import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const DURATION = 0.3
const X_START = 0
const X_LENGTH = 50
const Y_START = 25
const Y_GAP = 10
const HEIGHT = X_START + X_LENGTH
const WIDTH = HEIGHT // square aspect ration

const HamburgerButton = ({
  height = 50,
  onToggle = () => {},
  stroke = '#000',
  width = 50
}) => {
  const lineOneRef = useRef(null)
  const lineTwoRef = useRef(null)
  const lineThreeRef = useRef(null)
  const gsapTimelineRef = useRef(null)
  const [reversed, setReversed] = useState(false)

  const lineProps = { fill: 'none', stroke: stroke, strokeWidth: 2 }

  function toggleReverse () {
    setReversed(prev => !prev)
  }

  useEffect(() => {
    gsapTimelineRef.current = gsap.timeline({
      defaults: { duration: DURATION, ease: 'power2.out' },
      paused: true
    })

    gsapTimelineRef.current
      //  slide middle line to the left
      .to(lineTwoRef.current, {
        scale: 0
      })
      // rotate the top and bottom bars to form a cross
      .to(lineOneRef.current, {
        rotate: 45,
        transformOrigin: '50% 50%',
        y: Y_GAP,
        ease: 'elastic'
      })
      .to(
        lineThreeRef.current,
        {
          rotate: -45,
          transformOrigin: '50% 50%',
          y: -Y_GAP,
          ease: 'elastic'
        },
        `-=${DURATION}` // keep this animation in sync with the one before it via negative delay
      )
  }, [])

  useEffect(() => {
    reversed
      ? gsapTimelineRef.current.play()
      : gsapTimelineRef.current.reverse()

    onToggle({ isHamburger: !reversed, isCross: reversed })
  }, [reversed])

  return (
    <svg
      className='hamburger'
      xmlns='http://www.w3.org/2000/svg'
      viewBox={`0 0 ${HEIGHT} ${WIDTH}`}
      onClick={toggleReverse}
      style={{
        height: height ?? HEIGHT,
        width: width ?? WIDTH
      }}
    >
      <line
        className='hamburger__line hamburger__line--1'
        {...lineProps}
        ref={lineOneRef}
        x1={X_START}
        y1={Y_START - Y_GAP}
        x2={X_START + X_LENGTH} // align to v-top
        y2={Y_START - Y_GAP}
      />
      <line
        className='hamburger__line hamburger__line--2'
        {...lineProps}
        ref={lineTwoRef}
        x1={X_START}
        y1={Y_START}
        x2={X_START + X_LENGTH} // align v-center
        y2={Y_START}
      />
      <line
        className='hamburger__line hamburger__line--3'
        {...lineProps}
        ref={lineThreeRef}
        x1={X_START}
        y1={Y_START + Y_GAP}
        x2={X_START + X_LENGTH} // align to v-bottom
        y2={Y_START + Y_GAP}
      />
    </svg>
  )
}

export default HamburgerButton
