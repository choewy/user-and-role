import { Consumes } from '@/common';
import { PolicyKey } from '@/entities';
import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth';
import { RoleGuard, RolePolicyMetadata } from '../role';
import { CreatePolicyDto, PolicyParamDto } from './dtos';
import { PolicyService } from './policy.service';

@ApiTags('정책')
@Controller('policies')
export class PolicyController {
  constructor(private readonly service: PolicyService) {}

  @Post()
  @RolePolicyMetadata(PolicyKey.Global)
  @UseGuards(AuthGuard, RoleGuard)
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

  @Delete(':key')
  @RolePolicyMetadata(PolicyKey.Global)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: '정책 삭제' })
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  @ApiUnauthorizedResponse()
  async deletePolicy(@Param() params: PolicyParamDto) {
    return this.service.deletePolicy(params.key);
  }
}
