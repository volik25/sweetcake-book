/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import session = require('express-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['POST', 'GET', 'PUT', 'PATCH', 'OPTIONS', 'DELETE'],
      allowedHeaders: [
        'Origin',
        'Content-Type',
        'X-Auth-Token',
        'Authorization',
      ],
    },
  });
  const port = process.env.PORT || 3333;
  app.use(
    session({
      secret: 'qweadzxcfaasdad',
      resave: false,
      saveUninitialized: false,
    })
  );
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
