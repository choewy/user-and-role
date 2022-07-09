import { TYPEORM } from 'src/app.config';
import { DataSource } from 'typeorm';

export const DatabaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource(TYPEORM);
      return dataSource.initialize();
    },
  },
];
