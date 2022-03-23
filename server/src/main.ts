import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './error/http-exception.filter';
import { LogInterceptor } from './log/log.interceptor';
import { TransformInterceptor } from './transform/transform.interceptor';
import { ReportLogger } from './log/ReportLogger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionFilter } from './error/all-exception.filter';

const setupSwagger = (app) => {
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('待办事项')
    .setDescription('nest-todo 的 API 文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
};

async function bootstrap() {
  const reportLogger = new ReportLogger();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: ['http://localhost', 'http://localhost:3000'],
      credentials: true,
    },
    bufferLogs: true,
    logger: reportLogger,
  });

  app.useStaticAssets(join(__dirname, '..', 'upload_dist'));

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter(), new AllExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    // fix parameter escape    
    whitelist: true,
  }));
  app.useGlobalInterceptors(
    new LogInterceptor(reportLogger),
    new TransformInterceptor(),
  );

  setupSwagger(app);

  await app.listen(4200);
}

bootstrap();
