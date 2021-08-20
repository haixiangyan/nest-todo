import { Todo } from '../entities/todo.entity';
import { User } from '../../user/entities/user.entity';

const todo1 = new Todo();
todo1.id = 0;
todo1.title = 'todo1';
todo1.description = 'desc1';

const todo2 = new Todo();
todo2.id = 1;
todo2.title = 'todo2';
todo2.description = 'desc2';

export const mockTodos: Todo[] = [todo1, todo2];

const user1 = new User();
user1.id = 0;
user1.username = 'user';
user1.email = 'user@qq.com';
user1.is_admin = 0;

const user2 = new User();
user2.id = 1;
user2.username = 'admin';
user2.email = 'admin@qq.com';
user2.is_admin = 1;

export const mockUsers: User[] = [user1, user2];

export const mockTodoRepository = {
  find: () => mockTodos,
  findAllByUserId: (id: number) => mockUsers.find((user) => user.id == id),
};

export const mockUserRepository = {
  find: () => mockUsers,
};
