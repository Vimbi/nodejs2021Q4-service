import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { contentParser } from 'fastify-multer';

const PORT = parseInt(process.env.PORT) || 4000;

async function bootstrap() {
  let app;
  if (process.env.USE_FASTIFY === 'true') {
    console.log('111111111111111111')
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
    app.register(contentParser);
  } else {
    console.log('22222222222222222222222')
    app = await NestFactory.create(AppModule);
  }
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      validateCustomDecorators: true,
    })
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);

  app.useGlobalInterceptors(new LoggerInterceptor(logger));
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  if (process.env.USE_FASTIFY === 'true') {
    await app.listen(PORT, '0.0.0.0');
  } else {
    await app.listen(PORT);
  }
}
bootstrap();
