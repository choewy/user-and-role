import { Response } from 'express';
import { Controller, Get, Res } from '@nestjs/common';
import { ApiTags, ApiExcludeEndpoint } from '@nestjs/swagger';
import { SWAGGER_PATH } from '@/common';

@ApiTags('앱')
@Controller()
export class AppController {
  @Get()
  @ApiExcludeEndpoint(true)
  redirectToSwagger(@Res() response: Response): void {
    return response.redirect(SWAGGER_PATH);
  }
}
