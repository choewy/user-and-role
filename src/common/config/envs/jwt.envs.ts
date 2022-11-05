import { registerAs } from '@nestjs/config';
import { ConfigToken } from './enums';
import { JwtConfigType } from './types';

export default registerAs(
  ConfigToken.JWT,
  (): JwtConfigType => ({
    secret: process.env.JWT_SECRET,
  }),
);
