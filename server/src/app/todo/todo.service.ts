import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private TodoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const { title, description, media } = createTodoDto;

    const todo = new Todo();
    todo.title = title;
    todo.description = description;
    todo.status = 1;
    todo.media = media;

    return this.TodoRepository.create(todo);
  }

  async findAll(): Promise<Todo[]> {
    return this.TodoRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.TodoRepository.findOne(id);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const { title, description, status, media } = updateTodoDto;

    return this.TodoRepository.update(
      { id },
      { title, description, status, media },
    );
  }

  async remove(id: number) {
    return this.TodoRepository.delete({
      id,
    });
  }
}
