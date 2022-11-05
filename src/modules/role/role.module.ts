import { DefaultRole, Role } from '@/entities';
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
    const rows: Partial<Role>[] = Object.values(DefaultRole).map((name) => ({
      name,
    }));

    await this.repository.init(rows);
  }
}
