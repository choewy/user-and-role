import { Provider } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { InjectRowsToken } from '../enums';
import { PolicyKey } from './enums';
import { Policy } from './policy.entity';

export const PolicyInitRows: Provider = {
  inject: [],
  provide: InjectRowsToken.POLICIES,
  useFactory: () => () => {
    return Object.values(PolicyKey).map((key) =>
      plainToInstance(Policy, {
        key,
      }),
    );
  },
};
