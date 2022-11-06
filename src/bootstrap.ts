import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  AppConfigType,
  ConfigToken,
  ServerConfigType,
  SwaggerGenerator,
} from './common';
import { Settings as Luxon } from 'luxon';

export class Bootstrap {
  private static app: INestApplication;

  private static async create(module: any) {
    Luxon.defaultZone = 'Asia/Seoul';

    this.app = await NestFactory.create(module);

    const { json, urlencoded, cors } = this.app
      .get(ConfigService)
      .get<AppConfigType>(ConfigToken.APP);

    this.app.use(json);
    this.app.use(urlencoded);
    this.app.enableCors(cors);
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        validationError: {
          target: true,
          value: false,
        },
      }),
    );

    await SwaggerGenerator.create(this.app);
  }

  private static async listen() {
    const { host, port } = this.app
      .get(ConfigService)
      .get<ServerConfigType>(ConfigToken.SERVER);

    await this.app.listen(port, host);
  }

  public static async run(module: any) {
    await this.create(module);
    await this.listen();
  }
}
