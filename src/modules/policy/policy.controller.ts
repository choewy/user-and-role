import { Controller } from '@nestjs/common';
import { PolicyService } from './policy.service';

@Controller('policies')
export class PolicyController {
  constructor(private readonly service: PolicyService) {}
}
