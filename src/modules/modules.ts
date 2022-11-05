import {
  DefaultRole,
  DefaultRoleAndPolicy,
  DefaultUserAndRole,
  RoleAndPolicies,
  UserAndRoles,
} from '@/entities';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PolicyModule } from './policy';
import { RoleModule } from './role';
import { UserModule } from './user';

@Module({
  imports: [UserModule, RoleModule, PolicyModule],
})
export class Modules implements OnApplicationBootstrap {
  private readonly roleAndPoliciesRepository: Repository<RoleAndPolicies>;
  private readonly userAndRolesRepository: Repository<UserAndRoles>;

  constructor(private readonly dataSource: DataSource) {
    this.roleAndPoliciesRepository =
      this.dataSource.getRepository(RoleAndPolicies);
    this.userAndRolesRepository = this.dataSource.getRepository(UserAndRoles);
  }

  async onApplicationBootstrap(): Promise<void> {
    await this.roleAndPoliciesRepository.delete({});

    for (const key of Object.keys(DefaultRoleAndPolicy) as Array<
      keyof typeof DefaultRole
    >) {
      await this.roleAndPoliciesRepository.insert(
        DefaultRoleAndPolicy[key].getRows(),
      );
    }

    await this.userAndRolesRepository.delete({});

    for (const key of Object.keys(DefaultUserAndRole)) {
      await this.userAndRolesRepository.insert(
        DefaultUserAndRole[key].getRows(),
      );
    }
  }
}
