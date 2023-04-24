import React, { useContext } from 'react'
import { useState } from 'react';
import { TodoContext } from '../App';

const TodoList = ({deleteTodo, editTodo}) => {
  const {todos} = useContext(TodoContext);
  const [edit, setEdit] = useState({});
  const onBlurHandler = (oldTodo) => {
    editTodo({...oldTodo, title: edit.title})
    setEdit({});
  }
  return (
    <div className='display-todos'>
    {
      todos?.length > 0 ?
      (<ul className='todo-list'>
        {
          todos.map((todo, index) => (
            !todo.completed &&
            (<div key={todo.id} className='todo'>
                <li onClick={() => setEdit({editId : todo.id, isEdit : true, title : todo.title})} >
                <span>{index+1}. </span> 
                { 
                  edit.isEdit && edit.editId === todo.id ? 
                  <input type="text" value={edit.title} onChange={e => setEdit(preState => ({...preState,title : e.target.value}))} onBlur={() => onBlurHandler(todo)} autoFocus/> :
                  todo.title
                }
                </li> 
              <button className='delete-button' onClick={(e) => deleteTodo(todo.id)}>Delete</button>
              <button className='complete-button' onClick={() => editTodo({...todo, completed: true})}>Complete</button>
            </div>)
          ))
        }
      </ul>) :
      (<div className='empty'>
        <h5>No task yet</h5>
      </div>)
    }
  </div>
  )
}

export default TodoList