import React, { FC, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import axios from 'axios';

const baseURL = 'http://localhost:4200';

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  useEffect(() => {
    axios.request<Todo[]>(({ baseURL, url: '/todo', method: 'GET' }))
      .then(response => setTodos(response.data));
  }, []);

  const addTodo = () => {
    // 添加 todo
  };

  return (
    <div className='App'>
      <div>
        <input placeholder='输入新待办事项' type='text' />
        <button onClick={addTodo}>添加</button>
      </div>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <small>{todo.description}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
