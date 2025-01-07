interface Props {
    value: string;
}

function CounterDisplay({value}: Props) {
    return (
        <h1>{value}</h1>
    )
}

export default CounterDisplay