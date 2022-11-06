import { BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';

export const ToBoolean = <T>(key: Partial<keyof T>) =>
  Transform(({ obj }) => {
    const value = obj[key];

    if ([0, '0', false, 'false'].includes(value)) {
      return false;
    }

    if ([1, '1', true, 'true'].includes(value)) {
      return true;
    }

    throw new BadRequestException();
  });
