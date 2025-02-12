import React from 'react'
import Dot from './Dot'

const Two = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
      <Dot x={20} y={20} />
      <Dot x={80} y={80}></Dot>
    </svg>

  )
}

export default Two