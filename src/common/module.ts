import { Global, Module } from '@nestjs/common';
import { ConfigRootModule } from './config';
import { TypeOrmRootModule } from './typeorm';
import { JwtService } from './jwt';
import { BcryptService } from './bcrypt';

@Global()
@Module({
  imports: [ConfigRootModule, TypeOrmRootModule],
  providers: [BcryptService, JwtService],
  exports: [BcryptService, JwtService],
})
export class CommonModule {}
