import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { FollowProvider } from 'src/database/providers/follow.provider';
import { FollowRepository } from 'src/database/repositories/follow.repository';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [DatabaseModule, JwtResisger],
  providers: [FollowProvider, FollowRepository, FollowService],
  controllers: [FollowController],
})
export class FollowModule {}
