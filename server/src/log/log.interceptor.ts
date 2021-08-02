import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { tap } from 'rxjs/operators';

export class LogInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const http = context.switchToHttp();
    const request = http.getRequest();

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() =>
          console.log(`${request.method} ${request.url} ${Date.now() - now}ms`),
        ),
      );
  }
}
