import { ToBoolean } from '@/utils';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class RolePolicyQueryParamsDto {
  @ApiProperty()
  @ToBoolean<RolePolicyQueryParamsDto>('apply')
  @IsNotEmpty()
  @IsBoolean()
  apply: boolean;
}
