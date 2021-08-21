import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { TodoRepository } from '../db/repositories/TodoRepository';
import { UserRepository } from '../db/repositories/UserRepository';
import { MockTodoRepository } from '../db/mock/MockTodoRepository';
import { MockUserRepository } from '../db/mock/MockUserRepository';
import createMockDB from '../db/mock/db';
import { TodoStatus } from './entities/todo.entity';

const { mockTodos, mockUsers } = createMockDB();

describe('TodoService', () => {
  let mockTodoRepository;
  const mockUserRepository = new MockUserRepository(mockUsers);
  let service: TodoService;

  beforeEach(async () => {
    mockTodoRepository = new MockTodoRepository(mockTodos);

    const module: TestingModule = await Test.createTestingModule({
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

    service = module.get<TodoService>(TodoService);
  });

  it('create', async () => {
    const returnTodos = await service.create(99, {
      title: 'title99',
      description: 'desc99',
      status: TodoStatus.TODO,
    });
    expect(returnTodos.title).toEqual('title99');
    expect(returnTodos.description).toEqual('desc99');
    expect(returnTodos.status).toEqual(TodoStatus.TODO);
  });

  it('findAll', async () => {
    expect(service).toBeDefined();
    const returnTodos = await service.findAll();
    expect(returnTodos).toEqual(mockTodos);
  });
});
