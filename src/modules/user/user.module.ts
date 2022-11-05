import { ConfigToken, DefaultAccountConfigType } from '@/common';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule implements OnApplicationBootstrap {
  constructor(
    private readonly configService: ConfigService,
    private readonly repository: UserRepository,
  ) {}

  async onApplicationBootstrap() {
    const { names, accounts, passwords } =
      this.configService.get<DefaultAccountConfigType>(
        ConfigToken.DEFAULT_ACCOUNT,
      );

    await this.repository.init(
      names.map((_, i) => ({
        account: accounts[i],
        password: passwords[i],
        name: names[i],
      })),
    );
  }
}
