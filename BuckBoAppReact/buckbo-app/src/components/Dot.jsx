import React from 'react'

const Dot = (props) => {
  return (
    <circle cx={props.x} cy={props.y} r={10}></circle>
  )
}

export default Dot