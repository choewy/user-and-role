import { Inject, Injectable } from '@nestjs/common';
import { Sign } from 'crypto';
import { Repository } from 'typeorm';

@Injectable()
export class SignRepository {
  constructor(
    @Inject('SIGN_REPOSITORY')
    private readonly repository: Repository<Sign>,
  ) {}
}
