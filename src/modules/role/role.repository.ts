import { Role } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
  private readonly roleRepository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role);
  }

  async init(query: string[]): Promise<void> {
    const roles = await this.roleRepository.find();

    if (roles.length === 0) {
      for (const sql of query) {
        await this.roleRepository.query(sql);
      }
    }
  }
}
