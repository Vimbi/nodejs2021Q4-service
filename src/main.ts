import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

const PORT = parseInt(process.env.PORT) || 4000;

async function bootstrap() {
  let app;
  if (process.env.USE_FASTIFY) {
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
  if (process.env.USE_FASTIFY) {
    await app.listen(PORT, '0.0.0.0');
  } else {
    await app.listen(PORT);
  }
}
bootstrap();
