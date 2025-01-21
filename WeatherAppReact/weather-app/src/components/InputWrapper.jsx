import React from 'react'

const InputWrapper = ({ onChange, onClick }) => {
  return (
    <div className='inputWrapper'>
        <input type="text" className='placeInput' placeholder="Where???" onChange={(e) => {onChange(e.target.value)}}/>
        <button type='submit' className='searchBtn' onClick={onClick}>Find Out</button>
    </div>
  )
}

export default InputWrapper