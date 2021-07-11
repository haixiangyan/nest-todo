import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;

    return this.prisma.user.create({
      data: { username, password, email }
    });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email } = updateUserDto;

    return this.prisma.user.update(({
      data: { username, password, email },
      where: { id },
    }))
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id }
    })
  }
}
