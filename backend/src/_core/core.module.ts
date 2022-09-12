import { Module } from '@nestjs/common';
import { CoreConfigModule } from './modules/config.module';
import { CoreTypeormModule } from './modules/typeorm.module';

@Module({
  imports: [CoreConfigModule, CoreTypeormModule],
})
export class CoreModule {}
