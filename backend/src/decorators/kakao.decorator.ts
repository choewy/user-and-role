import { createParamDecorator } from '@nestjs/common';

export const KakaoID = createParamDecorator((_, req) => {
  return req.args[0].id;
});
