import { Provider } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRowsToken } from '../enums';
import { DefaultRoleName } from './enums';
import { Role } from './role.entity';

export const RoleInitRows: Provider = {
  inject: [],
  provide: InjectRowsToken.ROLES,
  useFactory: () => () => {
    return [
      plainToInstance(Role, {
        id: 1,
        name: DefaultRoleName.Empty,
      }),
      plainToInstance(Role, {
        id: 2,
        name: DefaultRoleName.Master,
      }),
      plainToInstance(Role, {
        id: 3,
        name: DefaultRoleName.Admin,
      }),
    ];
  },
};
