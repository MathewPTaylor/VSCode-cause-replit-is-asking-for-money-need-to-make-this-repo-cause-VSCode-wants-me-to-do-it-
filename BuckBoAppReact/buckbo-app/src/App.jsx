import { useState } from 'react'

import MainGame from './components/MainGame';
import BettingArea from './components/BettingArea';

function App() {
  const [BLDice, setBLDice] = useState(1);
  const [BRDice, setBRDice] = useState(1);
  const [PLDice, setPLDice] = useState(1);
  const [PRDice, setPRDice] = useState(1);
  const [winner, setWinner] = useState(0);
  const [rolled, setRolled] = useState(false);
  const [balance, setBalance] = useState(500);
  const [pick, setPick] = useState(-1);
  const [amount, setAmount] = useState(0);

  const randomInt = (min, max) => {
    return Math.floor(Math.random() * (max-min+1)) + min;
  }

  function diceRoll() {
    // alert(pick);
    if (!rolled) {
      setRolled(true);
    }
    let roll_count = 20;
    let timeout = 50;
    for (let i = 0; i < roll_count; i++) {
      setTimeout(() => {
        setBLDice(randomInt(1, 6));
        setBRDice(randomInt(1, 6));
        
        setPLDice(randomInt(1, 6));
        setPRDice(randomInt(1, 6));
      }, i*timeout);
    }

    setTimeout(()=> {
      let bankerLeft = randomInt(1, 6);
      let bankerRight = randomInt(1, 6);
      let playerLeft = randomInt(1, 6);
      let playerRight = randomInt(1, 6);

      let bankerRoll = bankerLeft + bankerRight;
      let playerRoll = playerLeft + playerRight;

      setBLDice(bankerLeft);
      setBRDice(bankerRight);
      
      setPLDice(playerLeft);
      setPRDice(playerRight);

      // setWinner(BLDice + BRDice > PLDice + PRDice? "banker" : BLDice + BRDice == PLDice + PRDice? null : "player");

      if (bankerRoll > playerRoll) {
        setWinner(0);
        if (pick == 0) {
          setBalance(parseInt(balance) + parseInt(amount) + parseInt(amount));
        }
      } else if (playerRoll > bankerRoll) {
        setWinner(1);
        if (pick == 1) {
          setBalance(parseInt(balance) + parseInt(amount) + parseInt(amount));
        }
      } else {
        if (pick == -1) {
          setBalance(parseInt(balance) + parseInt(10*amount));
        }
        setWinner(null);
      }

      setRolled(false);
    }, roll_count * timeout);
        
  }

  function clicked() {
    setBalance(parseInt(balance) - parseInt(amount));
    diceRoll();
    // alert(amount);
  }

  function onSelect(val) {
    setPick(val);
  }

  function bet(val) {
    setAmount(val);
  }

  // const arr = [<One/>, <Two/>, <Three/>, <Four/>, <Five/>, <Six/>];
  return (
    <>
      <div className="fuckthisshit" style={{display: "flex"}}>
        <div className="bettingArea">
          <BettingArea onClick={clicked} balance={balance} onSelect={onSelect} curPick={pick} inputVal={amount} onChange={setAmount}/>
        </div>
        <div style={{width: "60%", height: "100%"}}>
          <MainGame BLDice={BLDice} BRDice={BRDice} PLDice={PLDice} PRDice={PRDice} winner={winner}/>
        </div>
      </div>
    </>
  )
}

export default App
