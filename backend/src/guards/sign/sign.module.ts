import { Module } from '@nestjs/common';
import { JwtResisger } from 'src/app.util';
import { DatabaseModule } from 'src/database/database.module';
import { SignProvider } from 'src/database/providers/sign.provider';
import { SignRepository } from 'src/database/repositories/sign.repository';
import { SignException } from './sign.exception';
import { SignGuard } from './sign.guard';
import { SignService } from './sign.service';

@Module({
  imports: [DatabaseModule, JwtResisger],
  providers: [
    SignProvider,
    SignRepository,
    SignService,
    SignException,
    SignGuard,
  ],
  exports: [SignService, SignException],
})
export class SignModule {}
