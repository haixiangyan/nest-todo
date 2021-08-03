import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { QuoteController } from './quote.controller';

@Module({
  imports: [HttpModule],
  controllers: [QuoteController],
})
export class QuoteModule {}
