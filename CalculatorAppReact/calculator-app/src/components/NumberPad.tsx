import Button from "./Button"

interface NPProps {
    onClick: (val: string) => void
    onEqual: () => void
    onAC: () => void
    onMS: () => void
    onM: () => void
}

const NumberPad = ({onClick, onEqual, onAC, onMS, onM}: NPProps) => {
  return (
    <>
        <div className="row crow justify-content-md-center">
            <div className="col"><Button onAction={onAC} isAction={true}>AC</Button></div>
            <div className="col"><Button onAction={onMS} isAction={true}>MS</Button></div>
            <div className="col"><Button onAction={onM} isAction={true}>M</Button></div>
            <div className="col"><Button onClick={onClick} value=" + ">+</Button></div>
        </div>

        <div className="row crow justify-content-md-center">
            <div className="col"><Button onClick={onClick} value="7">7</Button></div>
            <div className="col"><Button onClick={onClick} value="8">8</Button></div>
            <div className="col"><Button onClick={onClick} value="9">9</Button></div>
            <div className="col"><Button onClick={onClick} value=" - ">-</Button></div>
        </div>

        <div className="row crow justify-content-md-center">
            <div className="col"><Button onClick={onClick} value="4">4</Button></div>
            <div className="col"><Button onClick={onClick} value="5">5</Button></div>
            <div className="col"><Button onClick={onClick} value="6">6</Button></div>
            <div className="col"><Button onClick={onClick} value=" x ">x</Button></div>
        </div>

        <div className="row crow justify-content-md-center">
            <div className="col"><Button onClick={onClick} value="1">1</Button></div>
            <div className="col"><Button onClick={onClick} value="2">2</Button></div>
            <div className="col"><Button onClick={onClick} value="3">3</Button></div>
            <div className="col"><Button onClick={onClick} value=" ÷ ">÷</Button></div>
        </div>

        <div className="row crow justify-content-md-center">
            <div className="col"><Button onClick={onClick} value="0">0</Button></div>
            <div className="col"><Button onClick={onClick} value=".">.</Button></div>
            <div className="col"><Button onClick={onClick} value="Ans">Ans</Button></div>
            <div className="col"><Button onAction={onEqual} isAction={true}>=</Button></div>
        </div>
    </>   
  )
}

export default NumberPad