import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { KakaoApiRequest } from 'src/oauth/kakao/kakao-api.request';

@Injectable()
export class KakaoGuard implements CanActivate {
  constructor(private readonly kakaoApiRequest: KakaoApiRequest) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    const tokenType = request.headers['tokentype'];
    const authorization = request.headers['authorization'] || ' ';
    const accessToken = authorization.split(' ')[1];

    switch (tokenType) {
      case 'kakao':
        const { kakaoId } = await this.kakaoApiRequest.getKakaoId(accessToken);
        request.id = kakaoId;
        return request;
      default:
        throw new UnauthorizedException({
          statusCode: 401,
          message: 'not login',
        });
    }
  }
}
