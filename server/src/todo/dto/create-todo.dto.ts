import { TodoStatus } from '../entities/todo.entity';
import { IsAlphanumeric, IsNumber } from 'class-validator';

export class CreateTodoDto {
  @IsAlphanumeric()
  title: string; // 标题

  description?: string; // 具体内容

  @IsNumber()
  status?: TodoStatus; // 状态

  media?: string;
}
