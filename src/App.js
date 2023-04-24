import React, { useEffect, useState } from 'react';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CompleteList from './components/CompleteList';

export const TodoContext = React.createContext({});

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({
    userId: 11,
    id: 0,
    title:"",
    completed: false
  });
  const addTodo = () => {
    if(todo.title !== '') {
      // console.log("todo",todo);
      // setTodos([...todos, todo]);
      console.log("todo-add",todo);
      axios.post('http://localhost:3004/todos', todo
      ).then((response) => {
        console.log("Added successfully", response);
        setTodo(preState => ({...preState, title: ""}))
        getTodos();
      }).catch((error) => {
        console.log("error-post" ,error);
      })
    }
    else{
      titleEmptyError();
    }
  };
  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3004/todos/${id}`)
    .then(response => {
      console.log("Deleted successfully", response);
      getTodos();
    })
    .catch( error => {
      console.log("delete", error);
    })
  }
  const editTodo = (newTodo) => {
      axios.put(`http://localhost:3004/todos/${newTodo.id}`, newTodo)
      .then(response => {
        console.log("Updated successfully", response);
        getTodos();
      })
      .catch(error => {
        console.log('error-put', error);
      })
  }
  const getTodos = () =>{
    axios.get('http://localhost:3004/todos')
      .then(function (response) {
        console.log(response);
        setTodos(response.data);
      })
      .catch(function (error) {
        console.log("error-get", error);
      })
  }
  const titleEmptyError = () => toast.error('Not valid todo!', {
                                  position: "top-center",
                                  autoClose: 4000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  theme: "colored",
                                });
  useEffect(() => {
    axios.get('http://localhost:3004/todos')
      .then(function (response) {
        console.log(response);
        setTodos(response.data);
      })
      .catch(function (error) {
        console.log("error-get", error);
      })
  }, [])

  return (
    <div className="App">
      <TodoContext.Provider value={{todo, setTodo, todos, setTodos}}>
        <TodoInput addTodo={addTodo}/>
        <TodoList deleteTodo={deleteTodo} editTodo={editTodo}/>
        <ToastContainer />
        <CompleteList deleteTodo={deleteTodo} editTodo={editTodo}/>
      </TodoContext.Provider>
    </div>
  );
}

export default App;
