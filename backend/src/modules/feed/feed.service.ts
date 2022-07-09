import { Injectable } from '@nestjs/common';
import { FeedRepository } from 'src/database/repositories/feed.repository';

@Injectable()
export class FeedService {
  constructor(private readonly feedRepository: FeedRepository) {}
}
