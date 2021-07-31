import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description, media } = createTodoDto;

    return this.prisma.todo.create({
      data: { title, description, status: 1, media },
    });
  }

  findAll(): Promise<Todo[]> {
    return this.prisma.todo.findMany();
  }

  findOne(id: number): Promise<Todo> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const { title, description, status, media } = updateTodoDto;

    return this.prisma.todo.update({
      data: { title, description, status, media },
      where: { id },
    });
  }

  remove(id: number): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}
