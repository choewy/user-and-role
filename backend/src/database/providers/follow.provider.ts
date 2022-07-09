import { DataSource } from 'typeorm';
import { Follow } from '../entities/follow.entity';

export const FollowProvider = {
  provide: 'FOLLOW_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Follow),
  inject: ['DATA_SOURCE'],
};
