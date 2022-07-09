import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly repository: Repository<User>,
  ) {}
}
