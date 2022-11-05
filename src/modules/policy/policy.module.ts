import { Policy, PolicyKey } from '@/entities';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyRepository } from './policy.repository';
import { PolicyService } from './policy.service';

@Module({
  providers: [PolicyRepository, PolicyService],
  controllers: [PolicyController],
})
export class PolicyModule implements OnApplicationBootstrap {
  constructor(private readonly repository: PolicyRepository) {}

  async onApplicationBootstrap(): Promise<void> {
    const rows: Partial<Policy>[] = Object.values(PolicyKey).map((key) => ({
      key,
    }));

    await this.repository.init(rows);
  }
}
