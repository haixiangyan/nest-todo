import { ApiProperty } from '@nestjs/swagger';
import { IsAlphanumeric, MaxLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsAlphanumeric()
  @MaxLength(14)
  username: string;

  @ApiProperty({ description: '密码' })
  password: string;

  @ApiProperty({ required: false, description: '邮箱' })
  email: string;
}
