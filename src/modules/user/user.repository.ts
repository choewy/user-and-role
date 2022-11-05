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
    await this.userRepository.clear();
    await this.userRepository.insert(
      rows.map((row) => plainToInstance(User, row)),
    );
  }
}
