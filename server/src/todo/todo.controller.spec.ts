import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoRepository } from '../db/repositories/TodoRepository';
import { UserRepository } from '../db/repositories/UserRepository';
import { MockTodoRepository } from '../db/mock/MockTodoRepository';
import { MockUserRepository } from '../db/mock/MockUserRepository';
import { mockTodos } from '../db/mock/db';

describe('TodoController', () => {
  let todoController: TodoController;
  let todoService: TodoService;
  const mockTodoRepository = new MockTodoRepository();
  const mockUserRepository = new MockUserRepository();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        TodoService,
        {
          provide: TodoRepository,
          useValue: mockTodoRepository,
        },
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    todoService = app.get<TodoService>(TodoService);
    todoController = app.get<TodoController>(TodoController);
  });

  describe('findAll', () => {
    const [firstTodo] = mockTodos;

    it('普通用户只能访问自己的 todo', async () => {
      jest
        .spyOn(todoService, 'findAllByUserId')
        .mockImplementation(async () => {
          return [firstTodo];
        });
      const todos = await todoController.findAll({
        user: { id: 0, is_admin: 0 },
      });
      expect(todos).toEqual([firstTodo]);
    });
    it('管理员能访问所有的 todo', async () => {
      jest.spyOn(todoService, 'findAll').mockImplementation(async () => {
        return mockTodos;
      });
      const todos = await todoController.findAll({
        user: { id: 0, is_admin: 1 },
      });
      expect(todos).toEqual(mockTodos);
    });
  });
});
