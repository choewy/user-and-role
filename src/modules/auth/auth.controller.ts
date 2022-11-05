import { Consumes } from '@/common';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos';
import { UserId } from './params';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: '인가' })
  async authorize(@UserId() id: number) {
    return this.service.getUser(id);
  }

  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: SignInDto })
  @ApiConsumes(Consumes.X_WWW_FORM, Consumes.JSON)
  async checkUser(@Body() body: SignInDto) {
    return this.service.checkUser(body.account, body.password);
  }

  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiBody({ type: SignUpDto })
  @ApiConsumes(Consumes.X_WWW_FORM, Consumes.JSON)
  async createUser(@Body() body: SignUpDto) {
    return this.service.createUser(
      body.account,
      body.password,
      body.confirmPassword,
      body.name,
    );
  }
}
