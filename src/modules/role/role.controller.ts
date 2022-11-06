import { Consumes } from '@/common';
import { PolicyKey } from '@/entities';
import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from '../auth';
import { CreateRoleDto, RoleParamDto, UpdateRoleDto } from './dtos';
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
  async createRole(@Body() body: CreateRoleDto): Promise<void> {
    return this.service.createRole(body.name);
  }

  @Patch(':id')
  @RolePolicyMetadata(PolicyKey.RoleUpdate)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: '역할 수정' })
  @ApiBearerAuth('master')
  @ApiBearerAuth()
  @ApiBody({ type: UpdateRoleDto })
  @ApiConsumes(Consumes.X_WWW_FORM, Consumes.JSON)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async updateRole(
    @Param() params: RoleParamDto,
    @Body() body: UpdateRoleDto,
  ): Promise<void> {
    return this.service.updateRole(params.id, body.name);
  }

  @Delete(':id')
  @RolePolicyMetadata(PolicyKey.RoleDelete)
  @UseGuards(AuthGuard, RoleGuard)
  @ApiOperation({ summary: '역할 삭제' })
  @ApiBearerAuth('master')
  @ApiBearerAuth()
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiUnauthorizedResponse()
  @ApiForbiddenResponse()
  @ApiNotFoundResponse()
  async deleteRole(@Param() params: RoleParamDto): Promise<void> {
    return this.service.deleteRole(params.id);
  }
}
