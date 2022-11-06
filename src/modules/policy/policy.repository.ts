import { Policy, Role, RoleAndPolicies } from '@/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PolicyRepository {
  private readonly policyRepository: Repository<Policy>;

  constructor(private readonly dataSource: DataSource) {
    this.policyRepository = this.dataSource.getRepository(Policy);
  }

  async getPolicyByKey(key: string): Promise<Policy> {
    return this.policyRepository.findOne({ where: { key } });
  }

  async insertPolicy(key: string): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      const { identifiers } = await em.getRepository(Policy).insert({ key });
      const policyKey = identifiers[0].key;
      const roles = await em.getRepository(Role).find();
      await em.getRepository(RoleAndPolicies).insert(
        roles.map((role) => {
          return plainToInstance(RoleAndPolicies, {
            roleId: role.id,
            policyKey,
            isApply: [2, 3].includes(role.id),
          });
        }),
      );
    });
  }

  async deletePolicy(key: string): Promise<void> {
    await this.dataSource.transaction(async (em) => {
      await em.getRepository(RoleAndPolicies).delete({ policyKey: key });
      await em.getRepository(Policy).delete({ key });
    });
  }
}
