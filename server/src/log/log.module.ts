import { Module } from '@nestjs/common';
import { ReportLogger } from './ReportLogger';

@Module({
  providers: [ReportLogger],
  exports: [ReportLogger],
})
export class LogModule {}
