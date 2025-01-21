interface Props {
  onClick: () => void;
}

function getTodo() {
  let inputVal = document.getElementById("todoInput")?.value
  console.log(inputVal);
  return inputVal
}

const InputBox = ({ onClick }: Props) => {
  return (
    <>
    <div className="container">  
      <div className="row justify-content-center">
        <div className="col-9">
          <input type="text" className="form-control" name="todoInput" id="todoInput" />
        </div>
        
        <div className="col col-sm-2">
          <button type="button" className="btn btn-primary" onClick={()=>{onClick}}>Add Todo</button>
        </div>
      </div>  
    </div>
    </>
  )
}

export default InputBox