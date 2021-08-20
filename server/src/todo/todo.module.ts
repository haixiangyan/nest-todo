import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../db/repositories/UserRepository';
import { TodoRepository } from '../db/repositories/TodoRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([TodoRepository, UserRepository]),
    UserModule,
  ],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
