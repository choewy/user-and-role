import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthException {
  unauthorized() {
    throw new UnauthorizedException({
      statusCode: 401,
      message: 'expired code',
    });
  }

  kakaoServerError() {
    throw new InternalServerErrorException({
      statusCode: 500,
      message: 'kakao server error',
    });
  }
}
