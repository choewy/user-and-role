import { IntersectionType } from '@nestjs/swagger';
import { PolicyParamDto } from '@/modules/policy/dtos';
import { RoleParamDto } from './role-param.dto';

export class RolePolicyParamDto extends IntersectionType(
  RoleParamDto,
  PolicyParamDto,
) {}
