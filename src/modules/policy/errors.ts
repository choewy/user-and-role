import { ClassException } from '@/utils';
import { BadRequestException, NotFoundException } from '@nestjs/common';

export class PolicyError extends ClassException {
  public static readonly AlreadyExistPolicy = new PolicyError(
    new BadRequestException('이미 존재하는 정책입니다.'),
  );

  public static readonly NotFoundPolicy = new PolicyError(
    new NotFoundException('존재하지 않는 정책입니다.'),
  );
}
