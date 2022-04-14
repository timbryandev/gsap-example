import React, { useState } from 'react'
import GSAPExample from './pages/gsap3.jsx'
import ScrollExample from './pages/scroll-example.jsx'
import Navbar from './components/navbar.jsx'
import './styles/reset.scss'
import './styles/global.scss'

const BRAND = 'Exzample Brand'
const VIEW_OPTIONS = ['Home Example', 'Scroll Example']

const App = () => {
  const [view, setView] = useState('Home Example')
  return (
    <>
      <Navbar brand={BRAND} items={VIEW_OPTIONS} onClick={setView} />
      {view === 'Home Example' && <GSAPExample />}
      {view === 'Scroll Example' && <ScrollExample />}
    </>
  )
}

export default App
