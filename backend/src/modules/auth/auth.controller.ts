import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { KAKAO } from 'src/app.config';
import { KakaoID } from 'src/decorators/kakao.decorator';
import { KakaoGuard } from 'src/guards/kakao/kakao.guard';
import { AuthService } from './auth.service';
import { SignCodeDto } from './dto/sign-code.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(KakaoGuard)
  async getAuthAndProfile(@KakaoID() kakaoId: string) {
    console.log(kakaoId);
    return await this.authService.getKakaoProfile(kakaoId);
  }

  @Get('kakao')
  async signWithKakao(@Query('code') code: string, @Res() res: Response) {
    const signCode = await this.authService.signWithKakao(code);
    return res.redirect(`${KAKAO.clientRedirectURL}?signCode=${signCode}`);
  }

  @Post('kakao/token')
  async getKakaoTokenWithSignCode(@Body() signCodeDto: SignCodeDto) {
    const { signCode } = signCodeDto;
    return await this.authService.getKakaoTokenWithSignCode(signCode);
  }
}
