import { User } from '../../src/app/user/entities/user.entity';
import { Todo } from '../../src/app/todo/entities/todo.entity';
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions';

const ormConfig: ConnectionOptions = {
  type: 'mariadb',
  database: 'nest_todo',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  entities: [User, Todo],
};

export default ormConfig;
