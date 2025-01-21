import { useState } from "react"

interface ButtonProps {
    onClick: (name: string) => void
}
const CounterInput = ({onClick}: ButtonProps) => {
    const [name, setName] = useState("")

  return (
    <>
        <input type="text" placeholder="Enter name" onChange={e => {setName(e.target.value)}}></input>
        <button onClick={()=>{onClick(name)}}>Add Counter</button>
    </>
  )
}

export default CounterInput