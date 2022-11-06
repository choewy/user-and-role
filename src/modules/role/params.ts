import { PolicyKey } from '@/entities';
import { SetMetadata } from '@nestjs/common';

export const RolePolicyMetadata = (...policies: PolicyKey[]) => {
  return SetMetadata('policies', policies);
};
