import { useState } from "react"
import NumberPad from "./NumberPad"
import CalculatorDisplay from "./CalculatorDisplay"
import Parser from "../Parser.tsx"

function CalculatorWrapper() {
    const [expression, setValue] = useState('0') // Number Pad
    const [isResult, setIsResult] = useState(false) // has a result been produced
    const [msVal, setMSVal] = useState('0') // MS value
    const [tokens, setTokens] = useState<string[]>([])
    const [answerStore, setAnswer] = useState(0)


    const insertInput = (newValue: string) => {
        setValue(expression == "0"? newValue : expression + newValue);
        setTokens([...tokens, newValue]);
        // setIsResult(Number.isInteger(newValue));
    }

    const onAC = () => {
        setValue("0");
        setIsResult(false);
        setTokens([]);
    }

    const onMS = () => {
        setMSVal(expression);
    }

    const onM = () => {
        insertInput(msVal);
    }

    const onEqual = () => {
        // do some calculation magic here
        // parser settings ykwim
        // expression ::= expression + term | term
          
        // alert(JSON.stringify(tokens));
        var calcResult: number = Parser.parseExpression(expression);
        console.log(calcResult);
        setAnswer(calcResult);
        setValue(`${calcResult}`);
        setIsResult(true);
    }

    return (
        <div className="container cwrapper" style={{width:'450px'}}>
            <CalculatorDisplay value={`${expression}`}/>
            <NumberPad onClick={insertInput} onEqual={onEqual} onAC={onAC} onMS={onMS} onM={onM}/>
        </div>   
    )
}

export default CalculatorWrapper