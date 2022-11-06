import { ClassException } from '@/utils';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

export class RoleError extends ClassException {
  public static readonly NotFoundUser = new RoleError(
    new UnauthorizedException('인증에 실패하였습니다.'),
  );

  public static readonly NotAccessable = new RoleError(
    new ForbiddenException('접근 권한이 없습니다.'),
  );

  public static readonly AlreadyExistRole = new RoleError(
    new ForbiddenException('이미 존재하는 역할입니다.'),
  );

  public static readonly NotFoundRole = new RoleError(
    new NotFoundException('존재하지 않는 역할입니다.'),
  );

  public static readonly CannotDeleteRole = new RoleError(
    new BadRequestException('삭제할 수 없는 역할입니다.'),
  );
}
