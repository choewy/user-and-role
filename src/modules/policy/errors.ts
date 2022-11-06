import { ClassException } from '@/utils';
import { BadRequestException } from '@nestjs/common';

export class PolicyError extends ClassException {
  public static readonly AlreadyExistPolicy = new PolicyError(
    new BadRequestException('이미 존재하는 정책입니다.'),
  );
}
