import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import imgSwirl from '../images/swirl.png'
import './gsap3.scss'

const ANIMATIONS = {
  floatDown: {
    opacity: 0,
    stagger: 0.6,
    y: -50
  },
  floatUp: {
    opacity: 0,
    y: 50
  },
  swipeUp: {
    scaleY: 0
  },
  slideInFromRight: {
    backgroundPosition: '200px 0',
    opacity: 0
  }
}

const GSAP3 = () => {
  const asideRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)
  const gsapTimelineRef = useRef(null)
  const [reversed, setReversed] = useState(null)
  const gsapSelector = gsap.utils.selector(contentRef)

  // Use gsap directly for one-off animations
  function onEnter ({ currentTarget }) {
    gsap.to(currentTarget, { rotate: '1deg', scale: 1.1 })
  }

  function onLeave ({ currentTarget }) {
    gsap.to(currentTarget, { rotate: '0deg', scale: 1 })
  }

  // Using the timeline for repeated animations
  // Inside of a useEffect hook to ensure the timeline is only created once
  useEffect(() => {
    gsapTimelineRef.current = gsap.timeline({
      defaults: { duration: 1 }
    })

    gsapTimelineRef.current
      .from(gsapSelector('.floatDown'), ANIMATIONS.floatDown)
      .to(
        gsapSelector('.swipeUp'),
        { ...ANIMATIONS.swipeUp, duration: 1.8 },
        '-=2.2'
      )
      .from(asideRef.current, ANIMATIONS.slideInFromRight, '-=1.5')
      .from(imageRef.current, ANIMATIONS.floatUp, '-=1.5')
  }, [])

  useEffect(() => {
    // skip logic on initial render
    if (reversed === null) return

    if (reversed) {
      gsapTimelineRef.current.play()
      return
    }

    gsapTimelineRef.current.reverse()
    setTimeout(() => gsapTimelineRef.current.play(), 1800)
  }, [reversed])

  return (
    <div id='gsap'>
      <main>
        <div className='content' ref={contentRef}>
          <h1 className='floatDown'>
            <div>
              <span className='swipeUp' />
              Bridging the gap
            </div>{' '}
            <div>
              <span className='swipeUp' />
              between dream
            </div>{' '}
            <div>
              <span className='swipeUp' />
              and reality
            </div>
          </h1>
          <p className='floatDown'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio at
            ipsa alias modi natus excepturi?
          </p>
          <button
            className='floatDown'
            onClick={() => setReversed(prev => !prev)}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
          >
            Start Dreaming
          </button>
        </div>
      </main>
      <aside ref={asideRef} className='slideInFromRight'>
        <div className='wrapper'>
          <img
            className='swirl floatUp'
            src={imgSwirl}
            alt='Swirl Graphic'
            ref={imageRef}
          />
        </div>
      </aside>
    </div>
  )
}

export default GSAP3
