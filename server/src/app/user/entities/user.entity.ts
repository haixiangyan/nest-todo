import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty()
  id: number; // 自增 id

  @ApiProperty()
  username: string; // 标题

  @ApiProperty()
  password: string; // 密码

  @ApiProperty()
  email: string; // 邮箱
}
