import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import imgSwirl from '../images/swirl.png'

const floatDownAnim = {
  opacity: 0,
  duration: 1,
  y: -50,
  stagger: 0.6
}

const floatUpAnim = {
  duration: 1,
  y: 30,
  opacity: 0,
  delay: 1.4
}

const swipeUpAnim = {
  scaleY: 0,
  duration: 1
}

const slideInFromRightAnim = {
  duration: 1,
  delay: 1.1,
  backgroundPosition: '200px 0',
  opacity: 0
}

const GSAP3 = () => {
  const asideRef = useRef(null)
  const contentRef = useRef(null)
  const imageRef = useRef(null)

  const gsapSelector = gsap.utils.selector(contentRef)

  useEffect(() => {
    gsap.from(gsapSelector('.floatDownAnim'), floatDownAnim)

    gsap.from(imageRef.current, floatUpAnim)

    gsap.to(gsapSelector('.swipeUpAnim'), swipeUpAnim)

    gsap.from(asideRef.current, slideInFromRightAnim)
  })

  return (
    <div id='gsap'>
      <main>
        <div className='content' ref={contentRef}>
          <h1 className='floatDownAnim'>
            <div>
              <span className='swipeUpAnim' />
              Bridging the gap
            </div>{' '}
            <div>
              <span className='swipeUpAnim' />
              between dream
            </div>{' '}
            <div>
              <span className='swipeUpAnim' />
              and reality
            </div>
          </h1>
          <p className='floatDownAnim'>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odio at
            ipsa alias modi natus excepturi?
          </p>
          <a href='#' className='floatDownAnim' id='cta'>
            Start Dreaming
          </a>
        </div>
      </main>
      <aside ref={asideRef} className='slideInFromRightAnim'>
        <div className='wrapper'>
          <img
            className='swirl floatUpAnim'
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
