import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const startSwagger = (app) => {
  const config = new DocumentBuilder()
    .setTitle('待办事项')
    .setDescription('nest-todo 的 API 文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  startSwagger(app);

  await app.listen(4200);
}

bootstrap();
