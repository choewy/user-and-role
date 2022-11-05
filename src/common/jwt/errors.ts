import { ClassException } from '@/utils';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';

export class JwtError extends ClassException {
  public static readonly ExpiredToken = new JwtError(
    new BadRequestException('토큰이 만료되었습니다.'),
  );

  public static readonly InvalidToken = new JwtError(
    new UnauthorizedException('인증에 실패하였습니다.'),
  );
}
