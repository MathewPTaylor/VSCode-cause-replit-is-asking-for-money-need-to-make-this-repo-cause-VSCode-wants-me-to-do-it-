import {useState} from "react"
import CounterDisplay from "./CounterDisplay"
import Button from "./Button"

interface NameProp {
    name: string
}
const Card = ({ name }: NameProp) => {
    const [count, setCounter] = useState(0)

    const Increment = () => {setCounter(count + 1)}

    const Decrement = () => {setCounter(count - 1)}
    return (
        <div className="card">
            <h1>{name}</h1>
            <CounterDisplay value={`${count}`} />
            <Button onClick={Decrement}>Decrement</Button>
            <Button onClick={Increment}>Increment</Button>
        </div>
    )
}

export default Card