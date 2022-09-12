import { Res } from '@nestjs/common';
import { SwaggerController } from '@swagger/decorators';
import { Response } from 'express';
import { AppRouter } from './app.router';
import { AppService } from './app.service';

@SwaggerController({ exclude: true })
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AppRouter.RedirectSwaggerDocs('get')
  async swaggerDocs(@Res() res: Response): Promise<void> {
    return res.redirect(this.appService.swaggerPath);
  }
}
