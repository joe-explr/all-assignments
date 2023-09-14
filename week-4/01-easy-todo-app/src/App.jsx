import { useState,useEffect } from 'react'
import axios from 'axios'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [todos, setTodos] = useState([])
    // fetch all todos from server
  useEffect(() => {
    axios.get('http://localhost:3000/todos').then((response)=>{
      setTodos(response.data)
      }).catch((err)=>{
        console.log("Errored out"+err)
      })
      setInterval(()=>{
        axios.get('http://localhost:3000/todos').then((response)=>{
          setTodos(response.data)
          }).catch((err)=>{
            console.log("Errored out"+err)
          })
      },1500)
  }, [])
  let remove= async (id)=> {
    await axios.delete('http://localhost:3000/todos/'+id)
    console.log("Deleted"+id)
    todos.filter((todo)=>{ todo.id!=id})
    setTodos(todos.filter((todo)=>{ return todo.id!=id}))
  }
  return (
    <>
      <div>
        <h1>Easy Todo App</h1>
        <input type="text" />
        <br/>
        {todos.map((todo)=>{
         return( <>
          <Todo title={todo.title} description={todo.description} />
          <button type='button' onClick={() =>remove(todo.id)}>Delete</button>
          <br/>
          </>)  
        })}
      </div>
    </>
  )
}

function Todo(props) {
    // Add a delete button here so user can delete a TODO.
    return (
      <>
       <span>{props.title}</span>  
       <span>{props.description}</span>  
      </>
    )
}

export default App