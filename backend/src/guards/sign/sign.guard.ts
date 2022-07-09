import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { SignService } from './sign.service';

@Injectable()
export class SignGuard implements CanActivate {
  constructor(private readonly signService: SignService) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest();
    return await this.signService.verifyToken(request);
  }
}
