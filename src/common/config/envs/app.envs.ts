import { registerAs } from '@nestjs/config';
import { json, urlencoded } from 'express';
import { ConfigToken } from './enums';
import { AppConfigType } from './types';

export default registerAs(
  ConfigToken.APP,
  (): AppConfigType => ({
    json: json({
      limit: process.env.APP_LIMIT,
    }),
    urlencoded: urlencoded({
      limit: process.env.APP_LIMIT,
      extended: process.env.APP_EXTENDS === 'true',
    }),
    cors: {
      credentials: process.env.APP_CORS_CREDENTIALS === 'true',
      origin: process.env.APP_CORS_ORIGIN.split(',').map(
        (exp) => new RegExp(exp),
      ),
    },
  }),
);
