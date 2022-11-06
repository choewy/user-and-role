import { Consumes } from '@/common';
import { PolicyKey } from '@/entities';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth';
import { CreateRoleDto } from './dtos';
import { RolePolicyMetadata } from './params';
import { RoleGuard } from './role.guard';
import { RoleService } from './role.service';

@Controller('roles')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  @RolePolicyMetadata(PolicyKey.RoleCreate)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: '역할 추가' })
  @ApiBearerAuth('master')
  @ApiBearerAuth()
  @ApiBody({ type: CreateRoleDto })
  @ApiConsumes(Consumes.X_WWW_FORM, Consumes.JSON)
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  async createRole(@Body() body: CreateRoleDto) {
    return this.service.createRole(body.name);
  }
}
