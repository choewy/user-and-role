import { applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiBodyOptions,
  ApiConsumes,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { SwaggerMimeTypes } from './enums';

export const SwaggerBody = (options: ApiBodyOptions) => {
  return applyDecorators(
    ApiBody(options),
    ApiConsumes(SwaggerMimeTypes.Xform, SwaggerMimeTypes.Json),
    ApiBadRequestResponse({
      description: '유효성 검사 오류',
    }),
  );
};
