import { applyDecorators } from '@nestjs/common';
import { SwaggerRouter, SwaggerRouterDecorator } from '@swagger/decorators';

export class AppRouter {
  public static RedirectSwaggerDocs: SwaggerRouterDecorator = (...args) => {
    return applyDecorators(SwaggerRouter(...args));
  };
}
