import loadConfig from './config/configurations';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { StaticModule } from './static/static.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ChatModule } from './chat/chat.module';
import { ScheduleModule } from '@nestjs/schedule';
import { QuoteModule } from './quote/quote.module';
import { CountModule } from './count/count.module';

const DOCKER_ENV = process.env.DOCKER_ENV;

const businessModules = [
  AuthModule,
  TodoModule,
  UserModule,
  UploadModule,
  StaticModule,
  ChatModule,
  QuoteModule,
  CountModule,
];

const libModules = [
  ConfigModule.forRoot({
    load: [loadConfig],
    envFilePath: [DOCKER_ENV ? '.docker.env' : '.env'],
  }),
  ScheduleModule.forRoot(),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => {
      const { host, port, username, password, database } =
        configService.get('db');

      return {
        type: 'mariadb',
        // .env 获取
        host,
        port,
        username,
        password,
        database,
        // entities
        entities: ['dist/**/*.entity{.ts,.js}'],
      };
    },
  }),
];

@Module({
  imports: [...libModules, ...businessModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
