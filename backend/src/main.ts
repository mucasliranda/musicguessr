import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './utils/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422,
    transform: true,
  }));

  app.useGlobalFilters(new AllExceptionsFilter());
  
  app.enableCors();
  
  app.use(bodyParser.json());

  await app.listen(3005);
}
bootstrap();
