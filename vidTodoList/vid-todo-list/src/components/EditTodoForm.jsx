import { faTasks } from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useState } from 'react'

const EditTodoForm = ({editTask, task}) => {
    const [value, setValue] = useState(task.task)

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value == "") {
            return
        }
        editTask(value, task.id);

        setValue("");    
    }

    return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input
            type="text" 
            className="todo-input"
            placeholder="Update Task"
            onChange={e => setValue(e.target.value)}
            value = {value}
        />
        <button type='submit' className='todo-btn'>Update Task</button>
    </form>
  )
}

export default EditTodoForm