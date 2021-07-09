import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  private todos: Todo[] = [{ id: '1', title: '吃饭', description: '我想吃饭' }];

  create(createTodoDto: CreateTodoDto): Todo {
    const { id, title, description } = createTodoDto;

    const newTodo = { id, title, description };

    this.todos.push(newTodo);

    return newTodo;
  }

  findAll() {
    return this.todos;
  }

  findOne(id: string) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: string, updateTodoDto: UpdateTodoDto) {
    let todo = this.findOne(id);

    todo = { ...todo, ...updateTodoDto };

    return todo;
  }

  remove(id: string) {
    return this.todos.filter((todo) => todo.id === id);
  }
}
