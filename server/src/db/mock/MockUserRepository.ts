import { mockUsers } from './db';
import { User } from '../../user/entities/user.entity';

export class MockUserRepository {
  find(): User[] {
    return mockUsers;
  }
}
