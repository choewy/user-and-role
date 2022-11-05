import { BcryptService, ConfigToken, DefaultAccountConfigType } from '@/common';
import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { DataSource } from 'typeorm';
import { InjectRowsToken } from '../enums';
import { User } from './user.entity';

export const UserInitRows: Provider = {
  inject: [ConfigService, BcryptService, DataSource],
  provide: InjectRowsToken.USERS,
  useFactory: (configService: ConfigService, bcrypt: BcryptService) => () => {
    const { names, accounts, passwords } =
      configService.get<DefaultAccountConfigType>(ConfigToken.DEFAULT_ACCOUNT);

    return names.map((_, i) =>
      plainToInstance(User, {
        id: i + 1,
        account: accounts[i],
        password: bcrypt.hash(passwords[i]),
        name: names[i],
      }),
    );
  },
};
