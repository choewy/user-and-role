import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Follow } from '../entities/follow.entity';

@Injectable()
export class FollowRepository {
  constructor(
    @Inject('FOLLOW_REPOSITORY')
    private readonly repository: Repository<Follow>,
  ) {}
}
