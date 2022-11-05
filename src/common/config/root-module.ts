import { ConfigModule } from '@nestjs/config';
import { envs } from './envs';

export const ConfigRootModule = ConfigModule.forRoot({
  isGlobal: true,
  load: envs,
});
