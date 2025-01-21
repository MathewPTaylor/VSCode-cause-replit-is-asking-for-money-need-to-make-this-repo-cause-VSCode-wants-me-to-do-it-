import { useState } from "react";

function Square({symbol, onClick}) {
    const [value, setValue] = useState(null);

    

    return (
        <button className="square" onClick={onClick}>{symbol}</button>
    )
}

export default function Board() {
    const [turn, setTurn] = useState(0);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function handleClick(index) {
        const nextSquares = squares.slice();
        nextSquares[index] = "XO"[turn];
        setSquares(nextSquares);
        console.log(squares);
        setTurn(turn == 1? 0: 1);
    }



    return (
        <>
            <div className="board-row">
                <Square symbol={squares[0]} onClick={()=>{handleClick(0)}}/>
                <Square symbol={squares[1]} onClick={()=>{handleClick(1)}}/>
                <Square symbol={squares[2]} onClick={()=>{handleClick(2)}}/>
            </div>
            <div className="board-row">
                <Square symbol={squares[3]} onClick={()=>{handleClick(3)}}/>
                <Square symbol={squares[4]} onClick={()=>{handleClick(4)}}/>
                <Square symbol={squares[5]} onClick={()=>{handleClick(5)}}/>
            </div>
            <div className="board-row">
                <Square symbol={squares[6]} onClick={()=>{handleClick(6)}}/>
                <Square symbol={squares[7]} onClick={()=>{handleClick(7)}}/>
                <Square symbol={squares[8]} onClick={()=>{handleClick(8)}}/>
            </div>
        </>
    );
}


