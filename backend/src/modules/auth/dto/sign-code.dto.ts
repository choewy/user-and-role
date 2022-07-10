import { IsNotEmpty, IsString } from 'class-validator';

export class SignCodeDto {
  @IsNotEmpty()
  @IsString()
  readonly signCode: string;
}
