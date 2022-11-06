import { JwtService } from '@/common';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(ctx: ExecutionContext): boolean {
    const http = ctx.switchToHttp();
    const request = http.getRequest<Request>();
    const token = (request.headers.authorization || 'Bearer').replace(
      'Bearer ',
      '',
    );

    request['user'] = this.jwt.decodeAccessToken(token);

    return true;
  }
}
