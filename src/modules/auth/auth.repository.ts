import { User } from '@/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AuthRepository {
  private readonly userRepository: Repository<User>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(User);
  }

  async findUserById(id: number) {
    return this.userRepository.findOne({
      relations: {
        roles: {
          role: {
            policies: true,
          },
        },
      },
      where: {
        id,
        roles: {
          role: {
            policies: {
              isApply: true,
            },
          },
        },
      },
    });
  }

  async findUserByAccount(account: string) {
    return this.userRepository.findOne({
      where: { account },
    });
  }

  async insertUser(user: Partial<User>): Promise<number> {
    const { identifiers } = await this.userRepository.insert(user);
    return identifiers[0].id;
  }
}
