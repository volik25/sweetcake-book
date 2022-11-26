/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import session = require('express-session');

import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerDocumentOptions,
} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:3333',
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
  const config = new DocumentBuilder()
    .setTitle('SweetCake API')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT'
    )
    .build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (_controllerKey: string, methodKey: string) =>
      methodKey,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
