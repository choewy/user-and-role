import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';
import { DataSource } from 'typeorm';
import { JwtService } from '../jwt';
import {
  SWAGGER_DESCRIPTION,
  SWAGGER_PATH,
  SWAGGER_TITLE,
  SWAGGER_VERSION,
} from './constants';

export class SwaggerGenerator {
  private static readonly builder = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'jwt',
    });

  private static readonly options: SwaggerUiOptions = {
    defaultModelsExpandDepth: -1,
    authAction: {},
  };

  public static async create(app: INestApplication) {
    const master = await app
      .get(DataSource)
      .query(`SELECT id FROM user WHERE id = 1;`);

    const id = master[0]?.id;

    if (id) {
      this.builder.addBearerAuth(undefined, 'master');
      this.options.authAction.master = {
        schema: {
          type: 'http',
          in: 'header',
          scheme: 'bearer',
          bearerFormat: 'jwt',
        },
        value: app.get(JwtService).issueAccessToken({ id }),
      };
    }

    SwaggerModule.setup(
      SWAGGER_PATH,
      app,
      SwaggerModule.createDocument(app, this.builder.build()),
      { swaggerOptions: this.options },
    );
  }
}
