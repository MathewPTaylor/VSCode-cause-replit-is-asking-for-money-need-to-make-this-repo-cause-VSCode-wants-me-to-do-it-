import { useState } from 'react'
import './App.css'
import Title from './components/Title'
import InputBox from './components/InputBox'
import ListItem from './components/ListItem'

function App() {
  const [listTodo, setListTodo] = useState([]);

  return (
    <>
      <Title>To-do List</Title>
      <InputBox></InputBox>

      {listTodo.map(todo => {console.log(todo)})}
    </>
  )
}

export default App
