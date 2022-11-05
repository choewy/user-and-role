import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    description: '아이디',
  })
  @IsNotEmpty()
  @IsString()
  account: string;

  @ApiProperty({
    description: '비밀번호',
  })
  @IsNotEmpty()
  @IsString()
  password: string;
}
