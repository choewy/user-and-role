import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}

  // kakaoId로 사용자 조회
  async selectWithKakaoId(kakaoId: string) {
    return await this.repository
      .createQueryBuilder('auth')
      .select()
      .where('auth.kakaoId = :kakaoId', { kakaoId })
      .getOne();
  }

  // kakaoId로 회원가입
  async createWithKakaoId(kakaoId: string) {
    return await this.repository.save({ kakaoId });
  }

  // SignCode로 사용자 조회
  async selectWithSignCode(signCode: string) {
    return await this.repository
      .createQueryBuilder('auth')
      .select()
      .where('auth.signCode = :signCode', { signCode })
      .getOne();
  }

  // SignCode 저장
  async updateSignCode(userId: string, signCode: string) {
    await this.repository.update({ userId }, { signCode });
  }

  // SignCode 삭제
  async deleteSignCode(userId: string) {
    await this.repository.update({ userId }, { signCode: '' });
  }
}
