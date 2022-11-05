import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigToken, SwaggerConfig } from '@core/configs';
import * as expressBasicAuth from 'express-basic-auth';

@Injectable()
export class SwaggerService {
  private readonly config: SwaggerConfig;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<SwaggerConfig>(ConfigToken.Swagger);
  }

  private get document() {
    return new DocumentBuilder()
      .addBearerAuth(undefined, 'JWT')
      .addBearerAuth({
        type: 'http',
        in: 'Header',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
      })
      .setVersion(this.config.version)
      .setTitle(this.config.title)
      .setDescription(this.config.description)
      .setContact(this.config.name, this.config.url, this.config.email)
      .build();
  }

  useDocument(app: INestApplication): void {
    const document = SwaggerModule.createDocument(app, this.document);

    SwaggerModule.setup(this.config.path, app, document, {
      explorer: false,
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        authAction: {
          MasterJWTAuth: {
            value: '',
            schema: {
              type: 'http',
              in: 'header',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
      },
    });

    app.use(
      this.config.path,
      expressBasicAuth({
        challenge: true,
        users: this.config.authorization,
      }),
    );
  }
}
