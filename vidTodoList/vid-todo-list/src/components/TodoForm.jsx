import React from 'react'
import { useState } from 'react'

const TodoForm = ({addTodo}) => {
    const [value, setValue] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (value == "") {
            return
        }
        addTodo(value);
        setValue("");    
    }

    return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input
            type="text" 
            className="todo-input"
            placeholder="What's the task today?"
            onChange={e => setValue(e.target.value)}
            value = {value}
        />
        <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  )
}

export default TodoForm