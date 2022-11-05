import { Provider } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRowsToken } from '../enums';
import { Role } from '../role';
import { User } from '../user';
import { UserAndRoles } from './user_and_roles.entity';

export const UserAndRolesInitRows: Provider = {
  inject: [],
  provide: InjectRowsToken.USER_AND_ROLES,
  useFactory: () => (users: Array<User>, roles: Array<Role>) => {
    const userAndRolesInitRows: Array<UserAndRoles> = [];

    users.forEach(({ id }, i) => {
      userAndRolesInitRows.push(
        plainToInstance(UserAndRoles, {
          userId: id,
          roleId: roles[i + 1].id,
        }),
      );
    });

    return userAndRolesInitRows;
  },
};
