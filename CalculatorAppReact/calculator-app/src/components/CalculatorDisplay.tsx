interface DisplayProps {
    value: string;
}

const CalculatorDisplay = ({value}: DisplayProps) => {
  return (
    <input className="form-control cinput" type="text" value={value}></input>
  )
}

export default CalculatorDisplay