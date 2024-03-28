import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.use(bodyParser.json());

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3005);
}
bootstrap();
