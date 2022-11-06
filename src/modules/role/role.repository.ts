import { Policy, Role, RoleAndPolicies, UserAndRoles } from '@/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
  private readonly roleRepository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role);
  }

  async findRoleByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async findRoleById(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async insertRole(name: string): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      const { identifiers } = await em.getRepository(Role).insert({ name });
      const roleId = identifiers[0].id;
      const policies = await em.getRepository(Policy).find();
      await em.getRepository(RoleAndPolicies).insert(
        policies.map((policy) => {
          return plainToInstance(RoleAndPolicies, {
            roleId,
            policyKey: policy.key,
            isApply: false,
          });
        }),
      );
    });
  }

  async deleteRole(id: number): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      await em.getRepository(RoleAndPolicies).delete({ roleId: id });
      await em.getRepository(UserAndRoles).delete({ roleId: id });
      await em.getRepository(Role).softDelete({ id });
    });
  }
}
