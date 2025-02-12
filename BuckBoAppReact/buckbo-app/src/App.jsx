import { useState } from 'react'

import MainGame from './components/MainGame';
import BettingArea from './components/BettingArea';

function App() {
  const [BLDice, setBLDice] = useState(1);
  const [BRDice, setBRDice] = useState(1);
  const [PLDice, setPLDice] = useState(1);
  const [PRDice, setPRDice] = useState(1);
  const [winner, setWinner] = useState(0);

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  function diceRoll() {
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        setBLDice(randomInt(1, 6));
        setBRDice(randomInt(1, 6));
        
        setPLDice(randomInt(1, 6));
        setPRDice(randomInt(1, 6));
      }, i*30);
    }
    let bankerLeft = randomInt(1, 6);
    let bankerRight = randomInt(1, 6);
    let playerLeft = randomInt(1,  6);
    let playerRight = randomInt(1, 6);

    let bankerRoll = bankerLeft + bankerRight;
    let playerRoll = playerLeft + playerRight;

    if (bankerRoll > playerRoll) {
      setWinner("Banker");
    } else if (playerRoll > bankerRoll) {
      setWinner("Player");
    } else {
      setWinner(null);
    }
    
    setBLDice(bankerLeft);
    setBRDice(bankerRight);
    setPLDice(playerLeft);
    setPRDice(playerRight);
    
  }

  // const arr = [<One/>, <Two/>, <Three/>, <Four/>, <Five/>, <Six/>];
  return (
    <>
      {/* <div className='banner'>
        <span className='bannerTitle'>Buckbo au Vivo</span>
      </div> */}
      
      <div style={{width: "60%", float: 'right', height: "100%"}}>
        <MainGame BLDice={BLDice} BRDice={BRDice} PLDice={PLDice} PRDice={PRDice} winner={winner}/>
      </div>
      <div style={{width: "40%"}}>
        <BettingArea onClick={diceRoll}/>
      </div>
    </>
  )
}

export default App
