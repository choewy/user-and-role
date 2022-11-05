import { ClassEnum } from 'class-enum';
import { plainToInstance } from 'class-transformer';
import { UserAndRoles } from './user_and_roles.entity';

export class DefaultUserAndRole extends ClassEnum<DefaultUserAndRole> {
  public static readonly Master = new DefaultUserAndRole('Master', 1, [1]);
  public static readonly Admin = new DefaultUserAndRole('Admin', 2, [2]);

  private readonly userId!: number;
  private readonly roleIds!: number[];

  public constructor(value: string, userId: number, roleIds: number[]) {
    super(value);

    this.userId = userId;
    this.roleIds = roleIds;
  }

  public getRows(): Partial<UserAndRoles>[] {
    return this.roleIds.map((roleId) =>
      plainToInstance(UserAndRoles, {
        userId: this.userId,
        roleId,
      }),
    );
  }
}
