import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SwaggerService } from './swagger.service';

@Module({
  providers: [ConfigService, SwaggerService],
  exports: [SwaggerService],
})
export class SwaggerModule {}
