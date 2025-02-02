import React from 'react'

const InputWrapper = ({ onChange, onClick, onUserLocation }) => {
  return (
    <form className='inputWrapper'>
      <input type="text" className='placeInput' placeholder="Where???" onChange={(e) => {onChange(e.target.value)}}/>
      <button type='submit' className='searchBtn' onClick={onClick}>Find Out</button>
      <button className='searchBtn' style={{backgroundColor: '#f60'}} onClick={onUserLocation}>My location</button>
    </form>
  )
}

export default InputWrapper