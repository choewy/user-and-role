import { applyDecorators, Controller, ControllerOptions } from '@nestjs/common';
import { ApiTags, ApiExcludeController } from '@nestjs/swagger';

type ApiControllerOptions = ControllerOptions & {
  tag?: string;
  exclude?: boolean;
};

export const SwaggerController = ({
  tag,
  exclude,
  ...options
}: ApiControllerOptions) => {
  const decorators = [Controller(options)];
  tag && decorators.push(ApiTags(tag));
  exclude && decorators.push(ApiExcludeController());
  return applyDecorators(...decorators);
};
