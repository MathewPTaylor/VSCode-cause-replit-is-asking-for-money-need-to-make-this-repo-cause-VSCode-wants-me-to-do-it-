interface Props {
    value: string;
}

function CounterDisplay({value}: Props) {
    return (
        <h2 className="counter-disp">{value}</h2>
    )
}

export default CounterDisplay