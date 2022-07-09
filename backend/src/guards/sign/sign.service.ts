import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignRepository } from 'src/database/repositories/sign.repository';
import { SignException } from './sign.exception';

@Injectable()
export class SignService {
  constructor(
    private readonly signRepository: SignRepository,
    private readonly signException: SignException,
    private readonly jwtService: JwtService,
  ) {}

  async verifyToken(req: Request) {
    const authorization = req.headers['authorization'] || ' ';
    const accessToken = authorization.split(' ')[1];

    if (!accessToken) {
      this.signException.unauthorized();
    }

    try {
      const decoded = await this.jwtService.verify(accessToken);
      req.user = decoded as Payload;
      return req;
    } catch (err) {
      const { message } = err;
      switch (message) {
        case 'expired token':
          return this.signException.expiredToken();
        default:
          return this.signException.unauthorized();
      }
    }
  }
}
