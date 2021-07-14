import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { StaticModule } from '../static/static.module';

@Module({
  imports: [AuthModule, TodoModule, UserModule, UploadModule, StaticModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
