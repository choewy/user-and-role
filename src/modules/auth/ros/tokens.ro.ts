import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokensRo {
  @ApiResponseProperty()
  @Expose()
  accessToken: string;

  @ApiResponseProperty()
  @Expose()
  refreshToken: string;
}
