import { registerAs } from '@nestjs/config';
import { ConfigToken } from './enums';
import { DefaultAccountConfigType } from './types';
import * as bcrypt from 'bcrypt';

export default registerAs(
  ConfigToken.DEFAULT_ACCOUNT,
  (): DefaultAccountConfigType => ({
    ids: process.env.DEFAULT_IDS.split(',').map((id) => parseInt(id, 10)),
    names: process.env.DEFAULT_NAMES.split(','),
    accounts: process.env.DEFAULT_ACCOUNTS.split(','),
    passwords: process.env.DEFAULT_PASSWORDS.split(',').map((password) =>
      bcrypt.hashSync(password, 10),
    ),
  }),
);
