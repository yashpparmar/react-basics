import React from 'react'
import { useContext } from 'react'
import { TodoContext } from '../App'
import moment from 'moment'
const TodoInput = ({addTodo}) => {
  const {todo, setTodo} = useContext(TodoContext);
  return (
    <>
      <h1>Todo App</h1>
      <div className='input-wrapper'>
        <input type="text" 
          className='todo-title'
          value={todo.title}
          placeholder="Create todo..."
          onChange={e => setTodo({
              userId: 11,
              id:moment().unix(), 
              title: e.target.value,
              completed: false
            })}
        />
        <button className='add-todo' onClick={addTodo} >Create</button>
      </div>
    </>
  )
}

export default TodoInput