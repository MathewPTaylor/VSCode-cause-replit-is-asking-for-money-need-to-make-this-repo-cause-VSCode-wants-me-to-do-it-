interface ButtonProps{
    children: string
    onClick: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className='btn' onClick={onClick}>{ children }</button>
  )
}

export default Button