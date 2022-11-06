import { Policy, Role, RoleAndPolicies, UserAndRoles } from '@/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
  private readonly roleRepository: Repository<Role>;
  private readonly policyRepository: Repository<Policy>;
  private readonly roleAndPolicyRepository: Repository<RoleAndPolicies>;

  constructor(private readonly dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role);
    this.policyRepository = this.dataSource.getRepository(Policy);
    this.roleAndPolicyRepository =
      this.dataSource.getRepository(RoleAndPolicies);
  }

  async findRoleByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } });
  }

  async findRoleById(id: number): Promise<Role> {
    return this.roleRepository.findOne({ where: { id } });
  }

  async findPolicyByKey(key: string): Promise<Policy> {
    return this.policyRepository.findOne({ where: { key } });
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

  async updateRole(id: number, name: string): Promise<void> {
    this.roleRepository.update({ id }, { name });
  }

  async updateRolePolicy(
    roleId: number,
    policyKey: string,
    isApply: boolean,
  ): Promise<void> {
    await this.roleAndPolicyRepository.update(
      { roleId, policyKey },
      { isApply },
    );
  }
}
