import { DataSource } from 'typeorm';
import { Feed } from '../entities/feed.entity';

export const FeedProvider = {
  provide: 'FEED_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Feed),
  inject: ['DATA_SOURCE'],
};
