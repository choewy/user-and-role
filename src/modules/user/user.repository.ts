import { User } from '@/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async init(rows: Partial<User>[]) {
    const tableName = this.dataSource.getMetadata(User).givenTableName;
    const query = `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`;
    await this.userRepository.delete({});
    await this.userRepository.query(query);
    await this.userRepository.insert(
      rows.map((row) => plainToInstance(User, row)),
    );
  }
}
