function BettingArea({onClick, onSelect, balance, curPick, inputVal, onChange}) {
    return(
        <>
            <h1>Balance: ${balance}</h1>
            <div id="inputContainer" className="contain">
                <label for="betInput" style={{display: "block"}}>Enter bet amount:</label>
                <input id="betInput" className="betInput" value={inputVal} onChange={(e)=>{onChange(e.target.value)}}></input>
            </div>
            <label htmlFor="radioContainer">Pick side</label>
            <div id="radioContainer" className="contain">
                <span>Player</span>
                <span>Banker</span>
                <input type="radio" name="pick" id="playerPick" className={`radioPick ${curPick == 1? 'selected': ''}`} value={1} onClick={()=>{onSelect(1)}}/> 
                <input type="radio" name="pick" id="housePick" className={`radioPick ${curPick == 0? 'selected' : ''}`} value={0} onClick={()=>{onSelect(0)}}/>
            </div>
            <div id='btnWrapper'>
                <button id="rollBtn" className="btn" onClick={onClick}>Roll</button>
            </div>
        </>
    )
}

export default BettingArea