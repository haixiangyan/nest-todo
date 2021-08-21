import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TodoModule } from '../src/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { Todo, TodoStatus } from '../src/todo/entities/todo.entity';
import { AuthModule } from '../src/auth/auth.module';
import { TodoRepository } from '../src/db/repositories/TodoRepository';
import { UserRepository } from '../src/db/repositories/UserRepository';
import { CreateTodoDto } from '../src/todo/dto/create-todo.dto';
import { UpdateTodoDto } from '../src/todo/dto/update-todo.dto';

describe('TodoController (e2e)', () => {
  const typeOrmModule = TypeOrmModule.forRoot({
    type: 'mariadb',
    database: 'nest_todo',
    username: 'root',
    password: '123456',
    entities: [User, Todo],
  });
  let app: INestApplication;
  let bearerToken: string;
  let createdTodo: Todo;

  beforeAll(async (done) => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TodoModule, AuthModule, typeOrmModule],
      providers: [TodoRepository, UserRepository],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    // 生成测试用户的 token
    request(app.getHttpServer())
      .post('/auth/login')
      .send({ username: 'user', password: 'user' })
      .expect(201)
      .expect((res) => {
        bearerToken = `Bearer ${res.body.token}`;
      })
      .end(done);
  });

  it('GET /todo', (done) => {
    return request(app.getHttpServer())
      .get('/todo')
      .set('Authorization', bearerToken)
      .expect(200)
      .expect((res) => {
        expect(typeof res.body).toEqual('object');
        expect(res.body instanceof Array).toBeTruthy();
        expect(res.body.length >= 3).toBeTruthy();
      })
      .end(done);
  });

  it('POST /todo', (done) => {
    const newTodo: CreateTodoDto = {
      title: 'todo99',
      description: 'desc99',
      status: TodoStatus.TODO,
      media: '',
    };

    return request(app.getHttpServer())
      .post('/todo')
      .set('Authorization', bearerToken)
      .send(newTodo)
      .expect(201)
      .expect((res) => {
        createdTodo = res.body;
        expect(createdTodo.title).toEqual('todo99');
        expect(createdTodo.description).toEqual('desc99');
        expect(createdTodo.status).toEqual(TodoStatus.TODO);
      })
      .end(done);
  });

  it('PATCH /todo/:id', (done) => {
    const updatingTodo: UpdateTodoDto = {
      title: 'todo9999',
      description: 'desc9999',
    };

    return request(app.getHttpServer())
      .patch(`/todo/${createdTodo.id}`)
      .set('Authorization', bearerToken)
      .send(updatingTodo)
      .expect(200)
      .expect((res) => {
        expect(res.body.title).toEqual(updatingTodo.title);
        expect(res.body.description).toEqual(updatingTodo.description);
      })
      .end(done);
  });

  it('DELETE /todo/:id', (done) => {
    return request(app.getHttpServer())
      .delete(`/todo/${createdTodo.id}`)
      .set('Authorization', bearerToken)
      .expect(200)
      .expect((res) => {
        expect(res.body.id).toEqual(createdTodo.id);
      })
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
