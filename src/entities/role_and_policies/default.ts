import { ClassEnum } from 'class-enum';
import { plainToInstance } from 'class-transformer';
import { PolicyKey } from '../policy';
import { RoleAndPolicies } from './role_and_policies.entity';

export class DefaultRoleAndPolicy extends ClassEnum<DefaultRoleAndPolicy> {
  public static readonly Empty = new DefaultRoleAndPolicy('Empty', 1, [
    PolicyKey.Empty,
  ]);

  public static readonly Master = new DefaultRoleAndPolicy(
    'Master',
    2,
    Object.values(PolicyKey).filter((key) => key !== PolicyKey.Empty),
  );

  public static readonly Admin = new DefaultRoleAndPolicy('Admin', 3, [
    PolicyKey.RoleRead,
    PolicyKey.RoleCreate,
    PolicyKey.RoleUpdate,
    PolicyKey.RoleDelete,
    PolicyKey.UserRead,
    PolicyKey.UserUpdate,
    PolicyKey.UserDelete,
  ]);

  private readonly id!: number;
  private readonly keys!: PolicyKey[];

  public constructor(value: string, id: number, keys: PolicyKey[]) {
    super(value);

    this.id = id;
    this.keys = keys;
  }

  public getRows(): Partial<RoleAndPolicies>[] {
    return Object.values(PolicyKey).map((policyKey) =>
      plainToInstance(RoleAndPolicies, {
        roleId: this.id,
        policyKey,
        isApply: this.keys.includes(policyKey),
      }),
    );
  }
}
