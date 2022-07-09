import { INestApplication } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { JWT } from './app.config';

export class Socket extends IoAdapter {
  createIOServer(port: number, options?: any) {
    return super.createIOServer(port, options);
  }
}

export class Swagger extends DocumentBuilder {
  useAppSwagger(app: INestApplication, config: Omit<OpenAPIObject, 'paths'>) {
    const docs = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/', app, docs);
  }
}

export const JwtResisger = JwtModule.register(JWT);
