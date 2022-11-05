import { Policy } from '@/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PolicyRepository {
  private readonly policyRepository: Repository<Policy>;

  constructor(private readonly dataSource: DataSource) {
    this.policyRepository = this.dataSource.getRepository(Policy);
  }

  async init(rows: Partial<Policy>[]): Promise<void> {
    await this.policyRepository.delete({});
    await this.policyRepository.insert(
      rows.map((row) => plainToInstance(Policy, row)),
    );
  }
}
