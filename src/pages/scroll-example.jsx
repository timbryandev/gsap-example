import React from 'react'
import Cube from '../components/cube.jsx'
import Scroller from '../components/scroller.jsx'
import './scroll-example.scss'

const ScrollExample = () => {
  return (
    <Scroller handleStateChange={console.log}>
      <main>
        <section className='level'>
          <div className='level__background level__background--1' />
          <div className='level__content'>
            <h2>1. Awesome Tagline goes here!</h2>
            <p>With some more important text that ins't just lorum ipsum.</p>
          </div>
        </section>
        <section className='level'>
          <div className='level__background level__background--2' />
          <div className='level__content'>
            <h2>2. Awesome Tagline goes here!</h2>
            <p>With some more important text that ins't just lorum ipsum.</p>
          </div>
        </section>
        <section className='level'>
          <div className='level__background level__background--3' />
          <div className='level__content'>
            <h2>3. Awesome Tagline goes here!</h2>
            <p>With some more important text that ins't just lorum ipsum.</p>
          </div>
        </section>
        <section className='level'>
          <div className='level__background level__background--4' />
          <div className='level__content'>
            <h2>4. Awesome Tagline goes here!</h2>
            <p>With some more important text that ins't just lorum ipsum.</p>
          </div>
        </section>
      </main>

      <Cube />
    </Scroller>
  )
}

export default ScrollExample
