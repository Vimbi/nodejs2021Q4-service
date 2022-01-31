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

const PORT = parseInt(process.env.PORT) || 4000;

async function bootstrap() {
  let app;
  if (process.env.USE_FASTIFY === 'true') {
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  } else {
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

  app.useGlobalFilters(new AllExceptionsFilter());

  if (process.env.USE_FASTIFY === 'true') {
    await app.listen(PORT, '0.0.0.0');
  } else {
    await app.listen(PORT);
  }
}
bootstrap();
