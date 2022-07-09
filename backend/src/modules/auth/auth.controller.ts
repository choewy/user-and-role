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
import { Payload } from 'src/decorators/payload.decorator';
import { SignGuard } from 'src/guards/sign/sign.guard';
import { AuthService } from './auth.service';
import { CreateTokenDto } from './dto/create-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get()
  @UseGuards(SignGuard)
  async checkAuth(@Payload() payload: Payload) {
    return payload;
  }

  @Get('kakao')
  async signWithKakao(@Query('code') code: string, @Res() res: Response) {
    const signCode = await this.authService.signWithKakao(code);
    return res.redirect(`${KAKAO.clientRedirectURL}?signCode=${signCode}`);
  }

  @Post('token')
  async createTokenWithSignCode(@Body() createTokenDto: CreateTokenDto) {
    return await this.authService.createTokenWithSignCode(createTokenDto);
  }
}
