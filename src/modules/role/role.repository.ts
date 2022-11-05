import { Role } from '@/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
  private readonly roleRepository: Repository<Role>;

  constructor(private readonly dataSource: DataSource) {
    this.roleRepository = this.dataSource.getRepository(Role);
  }

  async init(rows: Partial<Role>[]): Promise<void> {
    const tableName = this.dataSource.getMetadata(Role).givenTableName;
    const query = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`;
    await this.roleRepository.delete({});
    await this.roleRepository.query(query);
    await this.roleRepository.insert(
      rows.map((row) => plainToInstance(Role, row)),
    );
  }
}
