import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    const req = ctx.getRequest();
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
    res.status(status).json({
      statusCode: status,
      message: message,
      path: req.url,
    });
  }
}
