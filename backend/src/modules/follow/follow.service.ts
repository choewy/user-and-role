import { Injectable } from '@nestjs/common';
import { FollowRepository } from 'src/database/repositories/follow.repository';

@Injectable()
export class FollowService {
  constructor(private readonly followRepository: FollowRepository) {}
}
