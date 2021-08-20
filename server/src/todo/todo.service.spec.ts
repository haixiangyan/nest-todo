import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { mockTodoRepository, mockTodos, mockUserRepository } from './mock';
import { TodoRepository } from '../db/repositories/TodoRepository';
import { UserRepository } from '../db/repositories/UserRepository';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
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

  it('findAll', async () => {
    expect(service).toBeDefined();
    const returnTodos = await service.findAll();
    expect(returnTodos).toEqual(mockTodos);
  });
});
