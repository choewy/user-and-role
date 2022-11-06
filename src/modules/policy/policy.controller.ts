import { Consumes } from '@/common';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreatePolicyDto } from './dtos';
import { PolicyService } from './policy.service';

@ApiTags('정책')
@Controller('policies')
export class PolicyController {
  constructor(private readonly service: PolicyService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: '정책 추가' })
  @ApiBearerAuth()
  @ApiBody({ type: CreatePolicyDto })
  @ApiConsumes(Consumes.X_WWW_FORM, Consumes.JSON)
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  async createPolicy(@Body() body: CreatePolicyDto) {
    return this.service.createPolicy(body.key);
  }
}
