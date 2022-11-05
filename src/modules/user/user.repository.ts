import { User } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  private readonly userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async init(query: string[]) {
    const users = await this.userRepository.find();

    if (users.length === 0) {
      for (const sql of query) {
        await this.userRepository.query(sql);
      }
    }
  }
}
