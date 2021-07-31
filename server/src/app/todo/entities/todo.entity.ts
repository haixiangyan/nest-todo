import { ApiProperty } from '@nestjs/swagger';

export enum TodoStatus {
  TODO = 0, // 待完成
  DONE = 1, // 未完成
}

export class Todo {
  @ApiProperty()
  id: number; // 自增 id

  @ApiProperty()
  title: string; // 标题

  @ApiProperty()
  description?: string; // 具体内容

  @ApiProperty()
  status: TodoStatus; // 状态
}
