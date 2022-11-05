import { Module } from '@nestjs/common';
import { RoleModule } from './role';
import { UserModule } from './user';

@Module({
  imports: [UserModule, RoleModule],
})
export class Modules {}
