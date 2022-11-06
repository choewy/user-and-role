import { ClassException } from '@/utils';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

export class RoleError extends ClassException {
  public static readonly NotFoundUser = new RoleError(
    new UnauthorizedException('인증에 실패하였습니다.'),
  );

  public static readonly NotAccessable = new RoleError(
    new ForbiddenException('접근 권한이 없습니다.'),
  );

  public static readonly AlreadyExistRole = new RoleError(
    new ForbiddenException('이미 존재하는 역할입니다,'),
  );
}
