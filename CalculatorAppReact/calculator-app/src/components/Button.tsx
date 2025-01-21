interface ButtonProps {
    children: string;
    value?: string;
    onClick?: (value: string) => void;
    onAction?: () => void;
    isAction?: bool;
}

const Button = ({children, onClick, onAction, value = "", isAction = false}: ButtonProps) => {

  const handleFunction = () => {
    if (isAction) {
      onAction();
    } else {
      onClick(value);
    }
  }
  return (
    <button className="btn btn-secondary cbtn" onClick={handleFunction}>{children}</button>
  )
}

export default Button