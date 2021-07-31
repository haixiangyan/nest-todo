import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: '自增 id' })
  id: number;

  @ApiProperty({ description: '标题' })
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ description: '邮箱' })
  email: string;

  @ApiProperty({ description: '是否为管理员' })
  is_admin?: number;
}
