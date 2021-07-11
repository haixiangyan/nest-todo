import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsAlphanumeric()
  @MaxLength(14)
  username: string; // 用户名

  @ApiProperty()
  password: string; // 密码

  @ApiProperty({ required: false })
  email: string; // 邮箱
}
