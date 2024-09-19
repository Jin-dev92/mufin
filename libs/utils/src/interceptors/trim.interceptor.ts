// logging.interceptor.ts
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TrimInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    // console.log(`Incoming request to ${request.url}...`);

    return next
      .handle()
      .pipe
      // tap(() => console.log(`Response sent after... ${Date.now() - now}ms`)),
      ();
  }
}
