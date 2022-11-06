import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { SignInDto } from './signin.dto';

export class SignUpDto extends SignInDto {
  @ApiProperty({
    description: '비밀번호 확인',
    format: 'password',
  })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @ApiProperty({
    description: '이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
