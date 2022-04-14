import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Hamburger from './hamburger-close-button.jsx'
import './navbar.scss'

const Navbar = ({ brand, items, onClick }) => {
  const menuRef = useRef(null)
  const gsapTimelineRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  const gsapSelector = gsap.utils.selector(menuRef)

  useEffect(() => {
    gsapTimelineRef.current = gsap.timeline({
      defaults: { ease: 'power2.out' },
      paused: true
    })

    gsapTimelineRef.current
      .from(menuRef.current, { height: 0, opacity: 0 })

      .from(gsapSelector('li'), {
        scale: 0
      })
  }, [])

  useEffect(() => {
    isOpen ? gsapTimelineRef.current.play() : gsapTimelineRef.current.reverse()
  }, [isOpen])

  return (
    <nav className='navbar'>
      <h2 className='navbar__brand'>{brand}</h2>
      <div>
        <Hamburger onToggle={({ isHamburger }) => setIsOpen(!isHamburger)} />
        <ul className='navbar__items' ref={menuRef}>
          {items.map(item => (
            <li
              className='navbar__item'
              key={item}
              onClick={() => {
                setIsOpen(false)
                onClick(item)
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
