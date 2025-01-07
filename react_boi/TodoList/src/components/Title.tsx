interface TitleProps {
    children: string;
}

const Title = ({ children }: TitleProps) => {
  return (
    <center><h1>{ children }</h1></center>
  )
}

export default Title