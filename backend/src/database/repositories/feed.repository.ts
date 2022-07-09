import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Feed } from '../entities/feed.entity';

@Injectable()
export class FeedRepository {
  constructor(
    @Inject('FEED_REPOSITORY') private readonly repository: Repository<Feed>,
  ) {}
}
