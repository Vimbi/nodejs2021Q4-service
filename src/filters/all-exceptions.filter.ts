import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {}
  catch(exception, host: ArgumentsHost) {
    // console.log('!!!!!!!!!!!!!!!!!!!', exception)

    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();
    const url = process.env.USE_FASTIFY === 'true' ? req.url : req.originalUrl;
    const query = JSON.stringify(req.query);
    let body = '';
    if (req.body) {
      body = JSON.stringify(req.body);
    }
    let status: number;
    let message = '';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      exception = exception.getResponse();
      if (typeof exception === 'string') {
        message = exception;
      } else {
        message = exception.message;
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = exception.message;
    }

    this.logger.error(
      `${req.method} ${url} ${status} ${query} ${body} ${message}`
    );

    if (process.env.USE_FASTIFY === 'true') {
      res.status(status).send(exception);
    } else {
      res.status(status).json({
        statusCode: status,
        message: message,
        path: req.url,
      });
    }
  }
}
