import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { StaticModule } from './static/static.module';
import { TypeOrmModule } from '@nestjs/typeorm';

const businessModules = [
  AuthModule,
  TodoModule,
  UserModule,
  UploadModule,
  StaticModule,
];

const libModules = [TypeOrmModule.forRoot()];

@Module({
  imports: [...libModules, ...businessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
