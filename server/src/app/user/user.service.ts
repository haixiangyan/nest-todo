import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, password, email } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User();
    user.username = username;
    user.password = hashPassword;
    user.email = email;

    this.userRepository.create(user);
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

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    return this.userRepository.update(
      { id },
      { username, password: hashPassword, email },
    );
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
