import { Injectable } from '@nestjs/common';
import { PolicyError } from './errors';
import { PolicyRepository } from './policy.repository';

@Injectable()
export class PolicyService {
  constructor(private readonly repository: PolicyRepository) {}

  async createPolicy(key: string): Promise<void> {
    const policy = await this.repository.getPolicyByKey(key);

    if (policy) {
      PolicyError.AlreadyExistPolicy.throw();
    }

    await this.repository.insertPolicy(key);
  }

  async deletePolicy(key: string): Promise<void> {
    const policy = await this.repository.getPolicyByKey(key);

    if (!policy) {
      PolicyError.NotFoundPolicy.throw();
    }

    await this.repository.deletePolicy(key);
  }
}
