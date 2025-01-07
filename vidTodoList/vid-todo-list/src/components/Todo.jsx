import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, toggleEdit}) => {
    return (
    <div className='Todo'>
        <p 
            className={task.completed? 'completed' : 'incompleted'}
            onClick={() => toggleComplete(task.id)}
        >{task.task}</p>
        <div>
            <FontAwesomeIcon className='cursor' icon={faPenToSquare} onClick={() => toggleEdit(task.id)} /> 
            <FontAwesomeIcon className='cursor' icon={faTrash} onClick={()=>{deleteTodo(task.id)}} /> 
        </div>
    </div>
  )
}

// export default Todo