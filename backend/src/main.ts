import './types';
import * as config from './app.config';
import * as util from './app.util';
import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const socket = new util.Socket(app);
  const swagger = new util.Swagger();
  const logger = new Logger();

  app.enableCors(config.CORS);
  app.useGlobalPipes(config.PIPE);
  app.useWebSocketAdapter(socket);
  swagger.useAppSwagger(app, config.SWAGGER);

  await app.listen(config.PORT);
  logger.log(`NestJS Server Running on ${config.PORT}`);
};

bootstrap();
