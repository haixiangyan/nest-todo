import { Todo } from '../../todo/entities/todo.entity';
import { mockTodos } from './db';

export class MockTodoRepository {
  find(): Todo[] {
    return mockTodos;
  }
  findAllByUserId(userId: number): Todo[] {
    return mockTodos.filter((todo) => todo.author.id == userId);
  }
}
