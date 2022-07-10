import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { OpenAPIObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { JwtModuleOptions } from '@nestjs/jwt';
import { DataSourceOptions } from 'typeorm';

const isDevMode = process.env.NODE_ENV === 'development';

export const PORT = Number(process.env.PORT);
export const CORS: CorsOptions = {
  origin: process.env.ORIGIN,
  credentials: true,
};

export const PIPE = new ValidationPipe({
  whitelist: true,
  forbidNonWhitelisted: true,
  transform: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
});

export const SWAGGER: Omit<OpenAPIObject, 'paths'> = {
  openapi: '3.0.0',
  info: {
    title: 'PROJECT',
    description: 'SIDE PROJECT',
    version: '0.0.1',
  },
  servers: [
    {
      url: 'http://localhost:5000',
    },
  ],
  components: {
    securitySchemes: {
      JWT: {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
    },
  },
};

export const TYPEORM: DataSourceOptions = {
  type: 'mysql',
  host: String(process.env.MYSQL_HOST),
  port: Number(process.env.MYSQL_PORT),
  username: String(process.env.MYSQL_USERNAME),
  password: String(process.env.MYSQL_PASSWORD),
  database: String(process.env.MYSQL_DATABASE),
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  synchronize: isDevMode,
  logging: isDevMode,
};

export const KAKAO = {
  clientKey: process.env.KAKAO_CLIENT_KEY,
  adminKey: process.env.KAKAO_ADMIN_KEY,
  loginRedirectURL: process.env.KAKAO_LOGIN_REDIRECT_URL,
  clientRedirectURL: process.env.KAKAO_CLIENT_REDIRECT_URL,
  secure: !isDevMode,
};

export const JWT: JwtModuleOptions = {
  secret: String(process.env.JWT_SECRET),
};

export const BCRYPT = {
  rounds: Number(process.env.BCRYPT_ROUNDS),
};
