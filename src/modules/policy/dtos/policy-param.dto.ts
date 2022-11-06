import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PolicyParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  key: string;
}
