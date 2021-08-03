import React, { FC } from "react";
import { TodoItem } from "../../../types/Todo";

interface Props {
  todoList: TodoItem[];
  onDelete: (id: number) => void;
  onEdit: (todo: TodoItem) => void;
}

const List: FC<Props> = (props) => {
  const { todoList, onDelete, onEdit } = props;

  return (
    <ul>
      {todoList.map(todo => (
        <li key={todo.id}>
          <p>标题：{todo.title}</p>
          {todo.media && (
            <div>
              <img width={200} src={todo.media} alt="图片" />
            </div>
          )}
          <small>具体内容：{todo.description}</small>
          <div>
            <button onClick={() => onDelete(todo.id)}>移除</button>
            <button onClick={() => onEdit(todo)}>编辑</button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default List;
