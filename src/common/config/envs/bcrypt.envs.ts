import { registerAs } from '@nestjs/config';
import { ConfigToken } from './enums';
import { BcryptConfigType } from './types';

export default registerAs(
  ConfigToken.BCRYPT,
  (): BcryptConfigType => ({
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS, 10),
  }),
);
