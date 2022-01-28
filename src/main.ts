import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = parseInt(process.env.PORT) || 4000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: true,
      validateCustomDecorators: true,
    }),
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  await app.listen(PORT);
}
bootstrap();
