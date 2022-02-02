import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const req = context.switchToHttp().getRequest();
    const query = JSON.stringify(req.query);
    let body = '';
    if (req.body) {
      body = JSON.stringify(req.body);
    }
    const url = process.env.USE_FASTIFY === 'true' ? req.url : req.originalUrl;
    console.log('44444', req.url)
    console.log('55555', req.originalUrl)

    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        const status = res.statusCode;
        this.logger.log(
          `${req.method} ${url} ${status} ${query} ${body} ${
            Date.now() - now
          }ms`
        );
      })
    );
  }
}
