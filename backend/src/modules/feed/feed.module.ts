import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { FeedProvider } from 'src/database/providers/feed.provider';
import { FeedRepository } from 'src/database/repositories/feed.repository';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';

@Module({
  imports: [DatabaseModule, JwtResisger],
  providers: [FeedProvider, FeedRepository, FeedService],
  controllers: [FeedController],
})
export class FeedModule {}
