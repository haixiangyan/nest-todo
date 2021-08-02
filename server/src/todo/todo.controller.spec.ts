import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService],
    }).compile();

    todoService = module.get<TodoService>(TodoService);
    todoController = module.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  describe('findAll', () => {
    it('需要返回所有的 todos', async () => {
      const todos: Todo[] = [
        { id: 1, title: '第一条', description: '111', status: 1 },
      ];
      jest.spyOn(todoService, 'findAll').mockImplementation(async () => todos);

      expect(await todoController.findAll()).toBe(todos);
    });
  });
});
