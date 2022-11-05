import { Injectable } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
import { ConfigToken, ServerConfig, SwaggerConfig } from '@core/configs';
import { SwaggerService } from '@swagger';
import { json, urlencoded } from 'express';
import helmet from 'helmet';

@Injectable()
export class AppService {
  private app: INestApplication;
  private configs: {
    server: ServerConfig;
    cors: CorsOptions;
    swagger: SwaggerConfig;
  };

  constructor(
    private readonly configService: ConfigService,
    private readonly swaggerService: SwaggerService,
  ) {
    this.configs = {
      server: this.configService.get<ServerConfig>(ConfigToken.Server),
      cors: this.configService.get<CorsOptions>(ConfigToken.Cors),
      swagger: this.configService.get<SwaggerConfig>(ConfigToken.Swagger),
    };
  }

  get swaggerPath(): string {
    return this.configs.swagger.path;
  }

  async registerApp(app: INestApplication): Promise<void> {
    this.app = app;
  }

  async useDefaultMiddlware(): Promise<void> {
    const {
      server: { limit },
    } = this.configs;
    this.app.use(helmet());
    this.app.use(json({ limit }));
    this.app.use(urlencoded({ limit, extended: true }));
  }

  async useCors(): Promise<void> {
    const { cors } = this.configs;
    this.app.enableCors(cors);
  }

  async useSwagger(): Promise<void> {
    this.swaggerService.useDocument(this.app);
  }

  async listen(): Promise<void> {
    const {
      server: { port, host },
    } = this.configs;
    await this.app.listen(port, host);
  }
}
