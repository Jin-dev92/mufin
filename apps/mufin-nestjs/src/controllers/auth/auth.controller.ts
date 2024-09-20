import { Body, Controller, Ip, Post, Req } from '@nestjs/common';
import { AuthService } from '../../services';
import { KakaoOauthLoginDto, LoginDto, SignUpDto } from './dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.adminLogin(dto);
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.signUp(dto);
  }

  @Post('kakao/login')
  async kakaoOauthLogin(
    @Body() dto: KakaoOauthLoginDto,
    @Ip() ip: string,
    @Req() req: Request,
  ) {
    const userAgent = req.headers['user-agent'];
    return this.authService.kakaoOauthLogin(dto, ip, userAgent);
  }
  @Post('/kakao/logout')
  async kakaoOauthLogout() {
    return this.authService.kakaoOauthLogout();
  }
}
