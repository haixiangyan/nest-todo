import { TodoStatus } from '../entities/todo.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, IsNumber } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty()
  @IsAlphanumeric()
  title: string; // 标题

  @ApiProperty({ required: false })
  description?: string; // 具体内容

  @ApiProperty({ required: false })
  @IsNumber()
  status?: TodoStatus; // 状态
}
