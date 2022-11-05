import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): number => {
    return ctx.switchToHttp().getRequest<Request>()['user']?.id;
  },
);
