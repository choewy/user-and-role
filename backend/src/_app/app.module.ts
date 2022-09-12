import { Module } from '@nestjs/common';
import { CoreConfigModule, CoreTypeormModule } from '@core/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SwaggerModule } from '@swagger';

@Module({
  imports: [CoreConfigModule, CoreTypeormModule, SwaggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
