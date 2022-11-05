import { ClassException } from '@/utils';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class AuthError extends ClassException {
  public static readonly IncorrectPassword = new AuthError(
    new BadRequestException('비밀번호가 일치하지 않습니다.'),
  );

  public static readonly NotFoundUser = new AuthError(
    new NotFoundException('아이디를 찾을 수 없습니다.'),
  );

  public static readonly AlreadyUsedAccount = new AuthError(
    new BadRequestException('누군가 사용중인 아이디입니다.'),
  );
}
