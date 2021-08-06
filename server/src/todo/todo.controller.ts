import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('待办事项')
@ApiBearerAuth()
@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Request() request,
    @Body() createTodoDto: CreateTodoDto,
  ): Promise<Todo> {
    return this.todoService.create(request.user.id, createTodoDto);
  }

  @Get()
  findAll(@Request() request): Promise<Todo[]> {
    const { id, is_admin } = request.user;

    if (is_admin === 1) {
      return this.todoService.findAll();
    } else {
      return this.todoService.findAllByUserId(id);
    }
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.todoService.remove(id);
  }
}
