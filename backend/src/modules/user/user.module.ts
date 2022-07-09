import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { UserProvider } from 'src/database/providers/user.provider';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserContoller } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule, JwtResisger],
  providers: [UserProvider, UserRepository, UserService],
  controllers: [UserContoller],
})
export class UserModule {}
