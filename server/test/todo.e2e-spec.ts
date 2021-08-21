import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { TodoModule } from '../src/todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../src/user/entities/user.entity';
import { Todo } from '../src/todo/entities/todo.entity';
import { AuthModule } from '../src/auth/auth.module';
import { TodoRepository } from '../src/db/repositories/TodoRepository';
import { UserRepository } from '../src/db/repositories/UserRepository';

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
        expect(res.body.length).toEqual(3); // 普通用户
      })
      .end(done);
  });

  afterAll(async () => {
    await app.close();
  });
});
