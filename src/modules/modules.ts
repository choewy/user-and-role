import { DefaultRole, DefaultRoleAndPolicy, RoleAndPolicy } from '@/entities';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { PolicyModule } from './policy';
import { RoleModule } from './role';
import { UserModule } from './user';

@Module({
  imports: [UserModule, RoleModule, PolicyModule],
})
export class Modules implements OnApplicationBootstrap {
  private readonly roleAndPolicyRepository: Repository<RoleAndPolicy>;

  constructor(private readonly dataSource: DataSource) {
    this.roleAndPolicyRepository = this.dataSource.getRepository(RoleAndPolicy);
  }

  async onApplicationBootstrap(): Promise<void> {
    const keys = Object.keys(DefaultRoleAndPolicy) as Array<
      keyof typeof DefaultRole
    >;

    await this.roleAndPolicyRepository.delete({});

    for (const key of keys) {
      const rows = DefaultRoleAndPolicy[key].getData();
      await this.roleAndPolicyRepository.insert(rows);
    }
  }
}
