import { ClassException } from '@/utils';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common';

export class RoleError extends ClassException {
  public static readonly NotFoundUser = new RoleError(
    new UnauthorizedException('사용자를 찾을 수 없습니다.'),
  );

  public static readonly NotAccessable = new RoleError(
    new ForbiddenException('접근이 권한이 없습니다.'),
  );
}
