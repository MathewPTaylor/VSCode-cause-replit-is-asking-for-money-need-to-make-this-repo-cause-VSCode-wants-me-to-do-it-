import Dice from './Dice';
import One from './One';
import Two from './Two';
import Three from './Three';
import Four from './Four';
import Five from './Five';
import Six from './Six';

function MainGame({BLDice, BRDice, PLDice, PRDice, winner}) {
    const arr = [<One/>, <Two/>, <Three/>, <Four/>, <Five/>, <Six/>];
    // console.log("DIE", BLDice, BRDice, PLDice, PRDice);
    
    return (
        <>
            <div id='diceWrapper' className=' wrapper diceWrapper'>
                <div id='bankerDie' className='diceContainer' style={{backgroundColor: "#3e00ff"}}>
                    <div className='diceBanner'>Banker</div>
                    <Dice value={arr[BLDice - 1]} /> <Dice value={arr[BRDice - 1]} />
                    <div style={{height: "1.5rem", backgroundColor: "lightgrey", textAlign:"center"}}>{BLDice + BRDice}</div>
                </div>
                
                <div id='playerDie' className='diceContainer' style={{backgroundColor: "#e03"}}>
                    <div className='diceBanner'>Player</div>
                    <Dice value={arr[PLDice - 1]} /> <Dice value={arr[PRDice - 1]} />
                    <div style={{height: "1.5rem", backgroundColor: "lightgrey", textAlign:"center"}}>{PLDice + PRDice}</div>
                </div>
            </div>

            {winner? <p>{winner} wins!</p> : <p>Its a tie.</p>}
        </>
    )
}

export default MainGame 