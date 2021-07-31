import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return this.prisma.user.create({
      data: { username, password: hashPassword, email },
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  findByUsername(username: string) {
    return this.prisma.user.findFirst({
      where: { username },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email } = updateUserDto;

    return this.prisma.user.update({
      data: { username, password, email },
      where: { id },
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  checkAdmin(id: number) {
    return this.prisma.user.findFirst({
      where: {
        id,
        is_admin: 1,
      },
    });
  }
}
