import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CommonModule } from '@/common';
import { Modules } from '@/modules';

@Module({
  imports: [CommonModule, Modules],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
