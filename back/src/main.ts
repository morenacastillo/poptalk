import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const origenes = ['http://localhost:4200'];
  if (process.env.FRONT_URL) {
    origenes.push(process.env.FRONT_URL);
  }
  app.enableCors({ origin: origenes, credentials: true }); //acepta que la pagina del front le hable y lleve cookies a la del back

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
