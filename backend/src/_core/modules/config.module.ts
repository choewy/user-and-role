import { ConfigModule } from '@nestjs/config';
import { configs } from '../configs';

export const CoreConfigModule = ConfigModule.forRoot({
  isGlobal: true,
  load: configs,
});
