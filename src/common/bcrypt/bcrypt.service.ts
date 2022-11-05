import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BcryptConfigType, ConfigToken } from '../config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  private readonly config: BcryptConfigType;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<BcryptConfigType>(ConfigToken.BCRYPT);
  }

  hash(plainText: string) {
    return bcrypt.hashSync(plainText, this.config.saltRounds);
  }

  compare(plainText: string, hashedText: string): boolean {
    return bcrypt.compareSync(plainText, hashedText);
  }
}
