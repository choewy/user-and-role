import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class SignException {
  unauthorized() {
    throw new UnauthorizedException({
      statusCode: 401,
      message: '로그인하세요.',
    });
  }
  expiredToken() {
    throw new ForbiddenException({
      statusCode: 403,
      message: '토큰이 만료되었습니다.',
    });
  }
}
