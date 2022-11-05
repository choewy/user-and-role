import { Policy } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PolicyRepository {
  private readonly policyRepository: Repository<Policy>;

  constructor(private readonly dataSource: DataSource) {
    this.policyRepository = this.dataSource.getRepository(Policy);
  }

  async init(query: string[]): Promise<void> {
    const policies = await this.policyRepository.find();

    if (policies.length === 0) {
      for (const sql of query) {
        await this.policyRepository.query(sql);
      }
    }
  }
}
