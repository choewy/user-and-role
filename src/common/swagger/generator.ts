import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  SWAGGER_DESCRIPTION,
  SWAGGER_PATH,
  SWAGGER_TITLE,
  SWAGGER_VERSION,
} from './constants';

export class SwaggerGenerator {
  public static create(app: INestApplication) {
    SwaggerModule.setup(
      SWAGGER_PATH,
      app,
      SwaggerModule.createDocument(
        app,
        new DocumentBuilder()
          .setTitle(SWAGGER_TITLE)
          .setDescription(SWAGGER_DESCRIPTION)
          .setVersion(SWAGGER_VERSION)
          .addSecurity('bearer', {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'jwt',
          })
          .build(),
      ),
    );
  }
}
