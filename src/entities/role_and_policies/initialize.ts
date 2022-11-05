import { Provider } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRowsToken } from '../enums';
import { Policy, PolicyKey } from '../policy';
import { Role } from '../role';
import { RoleAndPolicies } from './role_and_policies.entity';

export const RoleAndPoliciesInitRows: Provider = {
  inject: [],
  provide: InjectRowsToken.ROLE_AND_POLICIES,
  useFactory: () => (roles: Array<Role>, policies: Array<Policy>) => {
    const rows: Array<RoleAndPolicies> = [];

    roles.forEach((row) => {
      const roleId = row.id;

      policies.forEach(({ key }) => {
        let isApply: boolean;

        switch (roleId) {
          case 1:
            switch (key) {
              case PolicyKey.Empty:
                isApply = true;
                break;

              default:
                isApply = false;
                break;
            }

            break;

          case 2:
            switch (key) {
              case PolicyKey.Empty:
                isApply = false;
                break;

              default:
                isApply = true;
                break;
            }

            break;

          case 3:
            switch (key) {
              case PolicyKey.Empty:
              case PolicyKey.Global:
                isApply = false;
                break;

              default:
                isApply = true;
                break;
            }

            break;
        }

        console.log(roleId, key, isApply);

        rows.push(
          plainToInstance<RoleAndPolicies, Partial<RoleAndPolicies>>(
            RoleAndPolicies,
            {
              roleId,
              policyKey: key,
              isApply,
            },
          ),
        );
      });
    });

    return rows;
  },
};
