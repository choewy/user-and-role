import {} from '@/entities';
import { Module } from '@nestjs/common';
import { PolicyController } from './policy.controller';
import { PolicyRepository } from './policy.repository';
import { PolicyService } from './policy.service';

@Module({
  providers: [PolicyRepository, PolicyService],
  controllers: [PolicyController],
})
export class PolicyModule {}
