import { User } from '@/entities';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  providers: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule implements OnApplicationBootstrap {
  constructor(private readonly repository: UserRepository) {}

  async onApplicationBootstrap() {
    const rows: Partial<User>[] = [
      { name: '관리자' },
      { name: '사용자' },
      { name: '테스트' },
    ];

    await this.repository.init(rows);
  }
}
