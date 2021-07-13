import { Module } from '@nestjs/common';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from '../todo/todo.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { UploadModule } from '../upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    AuthModule,
    TodoModule,
    UserModule,
    UploadModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload_dist'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
