import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { ReportLogger } from './ReportLogger';

export class LogInterceptor implements NestInterceptor {
  constructor(private reportLogger: ReportLogger) {
    this.reportLogger.setContext('LogInterceptor');
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          this.reportLogger.log(
            `${request.method} ${request.url} ${Date.now() - now}ms`,
          ),
        ),
      );
  }
}
