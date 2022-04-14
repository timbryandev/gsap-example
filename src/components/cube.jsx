import React from 'react'
import './cube.scss'

const Cube = () => (
  <div className='cube'>
    <div className='cube__container'>
      <div className='cube__face cube__face--top'>Top</div>
      <div className='cube__face cube__face--bottom'>Bottom</div>
      <div className='cube__face cube__face--left'>Left</div>
      <div className='cube__face cube__face--right'>Right</div>
      <div className='cube__face cube__face--front'>Front</div>
      <div className='cube__face cube__face--back'>Back</div>
    </div>
  </div>
)

export default Cube
