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

const libModules = [
  TypeOrmModule.forRoot({
    type: 'mariadb',
    database: 'nest_todo',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '123456',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/src/db/migrations/*.js'],
    cli: {
      migrationsDir: 'src/db/migrations',
    },
    synchronize: true, // 生产环境不能用这个属
  }),
];

@Module({
  imports: [...libModules, ...businessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
