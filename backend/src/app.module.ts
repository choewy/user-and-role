import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { FeedModule } from './modules/feed/feed.module';
import { FollowModule } from './modules/follow/follow.module';
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
    FeedModule,
    FollowModule,
    TagModule,
    UserModule,
  ],
})
export class AppModule {}
