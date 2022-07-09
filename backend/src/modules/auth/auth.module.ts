import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { UserProvider } from 'src/database/providers/user.provider';
import { AuthRepository } from 'src/database/repositories/auth.repository';
import { SignModule } from 'src/guards/sign/sign.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [DatabaseModule, JwtResisger, SignModule],
  providers: [UserProvider, AuthRepository, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
