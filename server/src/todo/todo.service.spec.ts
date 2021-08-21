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
  let mockUserRepository;
  let service: TodoService;

  beforeEach(async () => {
    mockUserRepository = new MockUserRepository(mockUsers);
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
    expect(service).toBeDefined();
    // 创建一个 todo
    const returnTodos = await service.create(99, {
      title: 'title99',
      description: 'desc99',
      status: TodoStatus.TODO,
    });
    // expect
    expect(returnTodos.title).toEqual('title99');
    expect(returnTodos.description).toEqual('desc99');
    expect(returnTodos.status).toEqual(TodoStatus.TODO);
  });

  it('findAll', async () => {
    expect(service).toBeDefined();
    const returnTodos = await service.findAll();
    // expect
    expect(returnTodos).toEqual(mockTodos);
  });

  it('findAllByUserId', async () => {
    expect(service).toBeDefined();
    // 直接返回第一个 user
    jest.spyOn(mockUserRepository, 'findOne').mockImplementation(async () => {
      return mockUsers[0];
    });
    // 找到 userId 为 0 的所有 todo
    const returnTodos = await service.findAllByUserId(0);
    const [firstTodo] = returnTodos;
    // expect
    expect(mockUserRepository.findOne).toBeCalled();
    expect(firstTodo.id).toEqual(0);
    expect(firstTodo.title).toEqual('todo1');
    expect(firstTodo.description).toEqual('desc1');
  });

  it('findOne', async () => {
    expect(service).toBeDefined();
    // 找到一个 todo
    const returnTodo = await service.findOne(0);
    // expect
    expect(returnTodo.id).toEqual(0);
    expect(returnTodo.title).toEqual('todo1');
    expect(returnTodo.description).toEqual('desc1');
  });

  it('update', async () => {
    expect(service).toBeDefined();
    // 所有 todo
    const allTodos = await service.findAll();
    // 更新一个 todo
    await service.update(0, {
      title: 'todo99',
      description: 'desc99',
    });
    // expect
    const targetTodo = allTodos.find((todo) => todo.id === 0);
    expect(targetTodo.id).toEqual(0);
    expect(targetTodo.title).toEqual('todo99');
    expect(targetTodo.description).toEqual('desc99');
  });

  it('remote', async () => {
    expect(service).toBeDefined();
    // 删除 todo
    await service.remove(0);
    // 获取所有 todo
    const allTodos = await service.findAll();
    // expect
    expect(allTodos.length).toEqual(1);
    expect(allTodos.find((todo) => todo.id === 0)).toBeUndefined();
  });
});
