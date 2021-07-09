import React, {FC, useEffect, useState} from 'react'
import {Todo} from "../types/Todo"

const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  useEffect(() => {
    // 获取 todo
  }, []);

  const addTodo = () => {
    // 添加 todo
  }

  return (
    <div className="App">
      <div>
        <input placeholder="输入新待办事项" type="text"/>
        <button onClick={addTodo}>添加</button>
      </div>

      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.title}</li>)}
      </ul>
    </div>
  );
}

export default App;
