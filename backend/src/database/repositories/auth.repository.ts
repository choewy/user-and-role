import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}

  async selectWithKakaoId(kakaoId: string) {
    return await this.repository
      .createQueryBuilder('auth')
      .select()
      .where('auth.kakaoId = :kakaoId', { kakaoId })
      .getOne();
  }

  async createWithKakaoId(kakaoId: string) {
    return await this.repository.save({ kakaoId });
  }

  async updateSignCode(userId: string, signCode: string) {
    await this.repository.update({ userId }, { signCode });
  }

  async selectWithSignCode(signCode: string) {
    return await this.repository
      .createQueryBuilder('auth')
      .select()
      .where('auth.signCode = :signCode', { signCode })
      .getOne();
  }

  async deleteSignCode(userId: string) {
    await this.repository.update({ userId }, { signCode: null });
  }
}
