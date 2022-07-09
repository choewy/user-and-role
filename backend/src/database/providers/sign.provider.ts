import { Sign } from 'crypto';
import { DataSource } from 'typeorm';

export const SignProvider = {
  provide: 'SIGN_REPOSITORY',
  useFactory: (dataSource: DataSource) => dataSource.getRepository(Sign),
  inject: ['DATA_SOURCE'],
};
