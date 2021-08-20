import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from '../db/repositories/UserRepository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;

    const user = new User();
    user.username = username;
    user.password = password;
    user.email = email;
    user.is_admin = 1;

    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return this.userRepository.findOne(id);
  }

  async findByUsername(username: string) {
    return this.userRepository.findOne({
      where: { username },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { username, password, email } = updateUserDto;

    return this.userRepository.update({ id }, { username, password, email });
  }

  async remove(id: number) {
    return this.userRepository.delete({
      id,
    });
  }

  async checkAdmin(id: number) {
    return this.userRepository.findOne({
      where: { id, is_admin: 1 },
    });
  }
}
