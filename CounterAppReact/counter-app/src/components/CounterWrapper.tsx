import { useState } from "react"
import CounterInput from "./CounterInput"
import Card from "./Card"

function CounterWrapper() {
    const [counters, setCounters] = useState<object[]>([])
    
    const addCounter = (name: string) => {
        setCounters([...counters, {name: name}])
    }
    return (
        <>
            <CounterInput onClick={addCounter} />
            <div className="grid">
                {counters.map((counter, index) => {
                    return <Card name={counter.name}/>
                })}
            </div>
        </>
    )
}

export default CounterWrapper