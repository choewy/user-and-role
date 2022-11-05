import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigRootModule, TypeOrmRootModule } from '@/common';
import { Modules } from '@/modules';

@Module({
  imports: [ConfigRootModule, TypeOrmRootModule, Modules],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
