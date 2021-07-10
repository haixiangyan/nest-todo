import { TodoStatus } from '../entities/todo.entity';

export class CreateTodoDto {
  title: string; // 标题
  id?: string; // 自增 id
  description?: string; // 具体内容
  status: TodoStatus; // 状态
}
