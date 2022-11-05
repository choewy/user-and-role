import { Injectable } from '@nestjs/common';
import { PolicyRepository } from './policy.repository';

@Injectable()
export class PolicyService {
  constructor(private readonly repository: PolicyRepository) {}
}
