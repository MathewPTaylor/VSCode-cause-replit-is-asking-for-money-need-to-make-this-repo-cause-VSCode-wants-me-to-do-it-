function BettingArea({onClick}) {
    return(
        <>
            <div id='btnWrapper'>
                <button id="rollBtn" className="btn" onClick={onClick}>Roll</button>
            </div>
        </>
    )
}

export default BettingArea