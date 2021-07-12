import React, {FC, useEffect, useState} from 'react'
import {ITodo} from "../../../types/Todo"
import http from "../../http"
import TodoForm from "../../Components/TodoForm"

const Todo: FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [todos, setTodos] = useState<ITodo[]>([])

  const [formType, setFormType] = useState<'add' | 'update' | null>(null)
  const [selected, setSelected] = useState<ITodo | undefined>()

  useEffect(() => {
    fetchTodos().then()
  }, [])

  const fetchTodos = async () => {
    setLoading(true)
    const {data} = await http.get<ITodo[]>('/todo')
    setTodos(data)
    setLoading(false)
  }

  const submitTodo = async (newTodo: Partial<ITodo>) => {
    setLoading(true)
    if (formType === 'add') {
      await http.post<ITodo>('/todo', newTodo)
    } else {
      await http.patch<ITodo>('/todo', newTodo)
    }
    setLoading(false)
    await fetchTodos()
  }

  const deleteTodo = async (id: number) => {
    setLoading(true)
    await http.delete<ITodo>(`/todo/${id}`)
    setLoading(false)
    await fetchTodos()
  }

  return (
    <div className='App'>
      {loading && <div>Loading...</div>}

      <div>
        <button onClick={() => {
          setFormType('add')
          setSelected(undefined)
        }}>
          添加新待办
        </button>
      </div>

      {(formType === 'add' || selected) && (
        <div>
          <TodoForm todo={selected} onSubmit={submitTodo}/>
        </div>
      )}

      <hr/>

      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <p>标题：{todo.title}</p>
            <small>具体内容：{todo.description}</small>
            <div>
              <button onClick={() => deleteTodo(todo.id)}>移除</button>
              <button
                onClick={() => {
                  setFormType('update')
                  setSelected(todo)
                }}
              >
                编辑
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todo
