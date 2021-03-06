import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { UserInputError, ValidationError } from 'apollo-server-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Projenin çalışacağı port
  await app.listen(3000);
}
bootstrap();
