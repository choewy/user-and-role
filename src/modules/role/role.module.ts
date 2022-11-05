import { Role } from '@/entities';
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';

@Module({
  providers: [RoleRepository, RoleService],
  controllers: [RoleController],
})
export class RoleModule implements OnApplicationBootstrap {
  constructor(private readonly repository: RoleRepository) {}

  async onApplicationBootstrap(): Promise<void> {
    const rows: Partial<Role>[] = [
      { name: '마스터' },
      { name: '관리자' },
      { name: '사용자' },
    ];

    await this.repository.init(rows);
  }
}
