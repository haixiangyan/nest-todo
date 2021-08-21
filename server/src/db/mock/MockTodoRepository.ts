import { Todo } from '../../todo/entities/todo.entity';

export class MockTodoRepository {
  private mockTodos: Todo[] = [];
  constructor(mockTodos: Todo[]) {
    this.mockTodos = mockTodos;
  }
  async save(todo: Todo): Promise<Todo> {
    this.mockTodos.push(todo);
    return todo;
  }
  async find(): Promise<Todo[]> {
    return this.mockTodos;
  }
  async findOne(id: number): Promise<Todo> {
    return this.mockTodos.find((todo) => todo.id === id);
  }
  async update(id: number, partialTodo: Partial<Todo>): Promise<Todo> {
    let targetTodo = this.mockTodos.find((todo) => todo.id === id);
    targetTodo = Object.assign(targetTodo, partialTodo);
    return targetTodo;
  }
  async delete(id: number): Promise<Todo> {
    const deletedTodo = this.mockTodos.find((todo) => todo.id === id);
    const deletedIndex = this.mockTodos.indexOf(deletedTodo);

    this.mockTodos = this.mockTodos.splice(deletedIndex, 1);

    return deletedTodo;
  }
}
