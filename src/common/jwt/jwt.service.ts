import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigToken, JwtConfigType } from '../config';
import { JwtPayload } from './types';
import { JwtError } from './errors';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private readonly config: JwtConfigType;

  constructor(private readonly configService: ConfigService) {
    this.config = this.configService.get<JwtConfigType>(ConfigToken.JWT);
  }

  issueAccessToken(payload: JwtPayload): string {
    return jwt.sign(payload, this.config.secret);
  }

  issueRefreshToken(): string {
    return jwt.sign({}, this.config.secret);
  }

  decodeAccessToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.config.secret) as JwtPayload;
    } catch (e) {
      switch (e.message) {
        case 'jwt expired':
          JwtError.ExpiredToken.throw();
          return;
        default:
          JwtError.InvalidToken.throw();
          return;
      }
    }
  }
}
