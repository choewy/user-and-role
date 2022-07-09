import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly signCode: string;
}
