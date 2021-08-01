import 'reflect-metadata';
import * as lodash from 'lodash';
import { createConnection, Repository } from 'typeorm';
import { getInitUsers, getRandomTodo, getRandomUser } from './random';
import { User } from '../../src/app/user/entities/user.entity';
import { Todo } from '../../src/app/todo/entities/todo.entity';

const checkExist = async (userRepository: Repository<User>) => {
  console.log('检查是否已初始化...');

  const userNum = await userRepository.count();
  const exist = userNum > 0;

  if (exist) {
    console.log(`已存在 ${userNum} 条用户数据，不再初始化。`);
    return true;
  }

  return false;
};

const seed = async () => {
  console.log('开始插入数据...');
  const connection = await createConnection({
    type: 'mariadb',
    database: 'nest_todo',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    entities: [User, Todo],
  });

  const userRepository = connection.getRepository<User>(User);

  const dataExist = await checkExist(userRepository);

  if (dataExist) {
    return;
  }

  const initUsers = getInitUsers();

  console.log('生成初始化数据...');
  const users = lodash.range(10).map(() => {
    const todos = lodash.range(3).map(() => {
      return getRandomTodo();
    });

    return getRandomUser(todos);
  });

  const allUsers = [...initUsers, ...users];

  console.log('插入初始化数据...');
  await userRepository.save(allUsers);

  console.log('数据初始化成功！');
};

seed()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
