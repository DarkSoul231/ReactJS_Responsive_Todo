import './App.css';
import React, { useState, useEffect } from 'react';
import Todolist from './Comonents/TodoList'
import Form from './Comonents/Form';



function App() {


  //Use States
  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState('all')
  const [filteredTodos, setFilteredTodos] = useState([])

  //Run Once when App Starts..
  useEffect(() => {
    getLocalTodos()
  }, [])

  //Use Effect
  useEffect(() => {
    filterHandler()
    saveLocalStorage()
  }, [todos, status])


  //Functions
  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos)
        break;
    }
  }
  // console.log(filteredTodos);

  const saveLocalStorage = () => {

    localStorage.setItem('todos', JSON.stringify(todos))
  }


  const getLocalTodos = () => {
    if (localStorage.getItem('todos') === null) {
      localStorage.setItem('todos', JSON.stringify([]))
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todos'))
      // console.log(todoLocal);
      setTodos(todoLocal)
    }
  }

  return (
    <div className="App">

      <header>
        <h1>Omi's Todo List</h1>
      </header>

      <Form
        todos={todos}
        setTodos={setTodos}
        inputText={inputText}
        setInputText={setInputText}
        setStatus={setStatus}

      />

      <Todolist filteredTodos={filteredTodos} todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
