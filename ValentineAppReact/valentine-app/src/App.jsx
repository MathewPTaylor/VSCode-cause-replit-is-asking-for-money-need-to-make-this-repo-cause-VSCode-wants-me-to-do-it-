import { useState } from 'react'
import './App.css'

function App() {
  const [xCoord, setX] = useState(0);
  const [yCoord, setY] = useState(0);

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)) + min
  }

  const jukeHisAss = (e) => {
    let min = 30;
    let max = 600;
    let newX = randomInt(min, max);
    let newY = randomInt(min, max);

    setX(newX);
    setY(newY);

    // e.target.style.transform = `translate(${newX}, ${newY})`;
  }
  return (
    <>
      <p style={{backgroundColor: 'green', left: {xCoord}, top: {yCoord}, position: 'absolute'}}>Hell yeah</p>
      <h1 id="title">Hello World</h1>
      <p>{xCoord}</p>
      <p>{yCoord}</p>
      <div className='formWrapper'>
        <div id="form">
          <button type='submit' className='btn'>Yes</button>
          <button type='submit' className='btn' onMouseOver={jukeHisAss} style={{position: "absolute"}}>No</button>
        </div>
      </div>
    </>
  )
}

export default App
