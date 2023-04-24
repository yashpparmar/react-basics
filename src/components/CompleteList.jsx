import React, { useContext } from 'react'
import { TodoContext } from '../App';

const CompleteList = ({deleteTodo, editTodo}) => {
  const {todos} = useContext(TodoContext);
  return (
    <div className='completed-list'>
      <h3>Complete List</h3>
      { 
        todos.find(todo => todo.completed) ?
          <ol>
            {
              todos.map((todo, index) => (
                todo.completed && 
                  <div className='completed-todo'>
                    <li>{todo.title}</li>
                    <button className='delete-button' onClick={(e) => deleteTodo(todo.id)}>Delete</button>
                    <button className='complete-button' onClick={() => editTodo({...todo, completed: false})}>Remove</button>
                  </div>
              ))
            }
          </ol> :
          <p><b>Not any one completed</b></p>
      }

    </div>
  )
}

export default CompleteList