import { createParamDecorator } from '@nestjs/common';

export const Payload = createParamDecorator((_, req) => req.user);
