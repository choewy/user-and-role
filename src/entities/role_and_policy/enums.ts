import { ClassEnum } from 'class-enum';
import { plainToInstance } from 'class-transformer';
import { PolicyKey } from '../policy';
import { RoleAndPolicy } from './role_and_policy.entity';

export class DefaultRoleAndPolicy extends ClassEnum<DefaultRoleAndPolicy> {
  public static readonly Master = new DefaultRoleAndPolicy('Master', 1, [
    PolicyKey.Global,
  ]);

  public static readonly Admin = new DefaultRoleAndPolicy('Admin', 2, [
    PolicyKey.RoleRead,
    PolicyKey.RoleCreate,
    PolicyKey.RoleUpdate,
    PolicyKey.RoleDelete,
    PolicyKey.UserRead,
    PolicyKey.UserUpdate,
    PolicyKey.UserDelete,
  ]);

  public static readonly User = new DefaultRoleAndPolicy('User', 3, [
    PolicyKey.UserRead,
  ]);

  private readonly id!: number;
  private readonly keys!: PolicyKey[];

  public constructor(value: string, id: number, keys: PolicyKey[]) {
    super(value);

    this.id = id;
    this.keys = keys;
  }

  public getData(): Partial<RoleAndPolicy>[] {
    return Object.values(PolicyKey).map((policyKey) =>
      plainToInstance(RoleAndPolicy, {
        roleId: this.id,
        policyKey,
        isApply: this.keys.includes(PolicyKey.Global)
          ? true
          : this.keys.includes(policyKey),
      }),
    );
  }
}
