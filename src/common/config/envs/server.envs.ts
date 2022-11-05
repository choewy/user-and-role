import { registerAs } from '@nestjs/config';
import { ConfigToken } from './enums';
import { ServerConfigType } from './types';

export default registerAs(
  ConfigToken.SERVER,
  (): ServerConfigType => ({
    host: process.env.SERVER_HOST,
    port: parseInt(process.env.SERVER_PORT, 10),
  }),
);
