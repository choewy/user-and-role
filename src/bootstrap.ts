import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Settings as Luxon } from 'luxon';
import { AppConfigType, ConfigToken, ServerConfigType } from './common';

Luxon.defaultZone = 'Asia/Seoul';

export class Bootstrap {
  private static app: INestApplication;

  private static async create(module: any) {
    this.app = await NestFactory.create(module);

    const { json, urlencoded, cors } = this.app
      .get(ConfigService)
      .get<AppConfigType>(ConfigToken.APP);

    this.app.use(json);
    this.app.use(urlencoded);
    this.app.enableCors(cors);
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