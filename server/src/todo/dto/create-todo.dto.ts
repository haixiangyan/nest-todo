import { TodoStatus } from '../entities/todo.entity';
import { IsAlphanumeric, IsNumber, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsAlphanumeric()
  title: string; // 标题

  @IsString()
  description?: string; // 具体内容

  @IsNumber()
  status?: TodoStatus; // 状态

  @IsString()
  media?: string;
}
