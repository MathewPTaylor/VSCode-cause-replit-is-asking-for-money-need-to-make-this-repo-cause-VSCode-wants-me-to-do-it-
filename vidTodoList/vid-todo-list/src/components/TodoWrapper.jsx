import React, {useState} from 'react'
import TodoForm from './TodoForm'
import {Todo} from './Todo'
import {v4 as uuidv4} from "uuid"
import EditTodoForm from './EditTodoForm'

const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = (todo) => {
        console.log(todos)
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
    }

    const toggleComplete = (id) => {
        setTodos(todos.map((todo) => {
            return todo.id == id? {...todo, completed: !todo.completed} : todo;
        }))
    }

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id != id))
    }

    const toggleEdit = (id) => {
        setTodos(todos.map((todo) => {return todo.id == id? {...todo, isEditing: !todo.isEditing} : todo}))
    }

    const editTask = (newTask, id) => {
        setTodos(todos.map((todo) => {return todo.id == id? {...todo, task: newTask, isEditing: !todo.isEditing} : todo }))
    }

    return (
        <div className='TodoWrapper'>
            <h1>Get Things Done!</h1>
            <TodoForm addTodo={addTodo}></TodoForm>
            {todos.map((todo, index) => {
                return todo.isEditing ? <EditTodoForm editTask={editTask} key={index} task={todo}/> : <Todo task={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} toggleEdit={toggleEdit} key={index}/>
            })}
        </div>
    )
}

export default TodoWrapper