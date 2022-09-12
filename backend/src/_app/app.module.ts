import { Module } from '@nestjs/common';
import { CoreConfigModule, CoreTypeormModule } from '@core/modules';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreConfigModule, CoreTypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
