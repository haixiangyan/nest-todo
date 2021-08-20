import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { Todo } from './entities/todo.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';

const todo = new Todo();
todo.id = 0;
todo.title = 'title';
todo.description = 'desc';
const mockTodos: Todo[] = [todo];

const user = new User();
user.id = 0;
user.username = 'Jack';
user.email = 'Jack@qq.com';
const mockUsers: User[] = [user];

const mockTodoRepository = {
  find: () => mockTodos,
};

const mockUserRepository = {
  find: () => mockUsers,
};

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getRepositoryToken(Todo),
          useValue: mockTodoRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('测试 findAll', async () => {
    expect(service).toBeDefined();
    const returnTodos = await service.findAll();
    expect(returnTodos).toEqual(mockTodos);
  });
});
