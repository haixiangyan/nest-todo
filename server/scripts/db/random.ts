import { User } from '../../src/app/user/entities/user.entity';
import { Todo, TodoStatus } from '../../src/app/todo/entities/todo.entity';
import * as faker from 'faker';

export const getInitUsers = () => {
  const admin = new User();
  admin.email = 'admin@admin.com';
  admin.username = 'admin';
  admin.password = 'admin';
  admin.is_admin = 1;

  const user = new User();
  user.email = 'user@admin.com';
  user.username = 'user';
  user.password = 'user';
  user.is_admin = 0;

  return [admin, user];
};

export const getRandomUser = (todos?: Todo[]): User => {
  const user = new User();

  user.username = faker.name.findName();
  user.email = faker.internet.email();
  user.password = '123456';
  user.is_admin = faker.datatype.number({ min: 0, max: 1 });
  user.todos = todos || [];

  return user;
};

export const getRandomTodo = (): Todo => {
  const todo = new Todo();

  todo.title = faker.lorem.words();
  todo.description = faker.lorem.sentence();
  todo.status = faker.random.arrayElement([TodoStatus.TODO, TodoStatus.DONE]);
  todo.media = faker.datatype.boolean() ? faker.image.imageUrl() : '';

  return todo;
};
