import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class KakaoException {
  serverError() {
    throw new InternalServerErrorException({
      statusCode: 500,
      message: 'kakao server error',
    });
  }
}
