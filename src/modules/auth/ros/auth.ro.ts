import { PolicyKey } from '@/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DateTime } from 'luxon';

export class AuthPolicyDto {
  @ApiResponseProperty({
    enum: PolicyKey,
    example: Object.values(PolicyKey).join(' | '),
  })
  @Expose()
  policyKey: PolicyKey | string;

  @ApiResponseProperty()
  @Expose()
  isApply: boolean;
}

export class AuthRoleDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty({
    type: [AuthPolicyDto],
  })
  @Expose()
  policies: AuthPolicyDto[];
}

export class AuthRo {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  account: string;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  createdAt: DateTime;

  @ApiResponseProperty()
  @Expose()
  updatedAt: DateTime;

  @ApiResponseProperty({
    type: [AuthRoleDto],
  })
  @Expose()
  roles: AuthRoleDto[];
}
