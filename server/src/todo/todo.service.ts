import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Todo } from './entities/todo.entity';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  private todos: Todo[] = [{ id: 1, title: '吃饭', description: '我想吃饭', status: 1 }];

  create(createTodoDto: CreateTodoDto): string {
    return 'created';
  }

  findAll() {
    return this.prisma.todo.findMany();
  }

  findOne(id: number) {
    return this.todos.find((todo) => todo.id === id);
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return 'updated';
  }

  remove(id: string) {
    return 'removed';
  }
}
