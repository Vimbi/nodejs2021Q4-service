import {
  CallHandler,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  mixin,
  NestInterceptor,
  Optional,
  Type,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import FastifyMulter from 'fastify-multer';
import { Options, Multer } from 'multer';

type MulterInstance = any;
export function FastifyFileInterceptor(
  fieldName: string,
  localOptions: Options
): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    protected multer: MulterInstance;

    constructor(
      @Optional()
      @Inject('MULTER_MODULE_OPTIONS')
      options: Multer
    ) {
      this.multer = (FastifyMulter as any)({ ...options, ...localOptions });
    }

    async intercept(
      context: ExecutionContext,
      next: CallHandler
    ): Promise<Observable<any>> {
      console.log('99999999999999999')

      const ctx = context.switchToHttp();

      await new Promise<void>((resolve, reject) =>
        this.multer.single(fieldName)(
          ctx.getRequest(),
          ctx.getResponse(),
          (error) => {
            if (error) {
              // const error = transformException(err);
              // return reject(error);
              throw new HttpException(error, HttpStatus.BAD_REQUEST);
            }
            resolve();
          }
        )
      );

      return next.handle();
    }
  }
  const Interceptor = mixin(MixinInterceptor);
  return Interceptor as Type<NestInterceptor>;
}
