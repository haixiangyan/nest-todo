import { Module } from '@nestjs/common';
import { StaticController } from './static.controller';

@Module({
  controllers: [StaticController],
})
export class StaticModule {}
