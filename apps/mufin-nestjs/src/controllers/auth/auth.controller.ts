import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../../services';
import { KakaoOauthCallbackDto, LoginDto, SignUpDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.adminLogin(dto);
  }

  @Post('sign-up')
  async signUp(@Body() dto: SignUpDto) {
    return this.authService.adminSignUp(dto);
  }

  @Get('kakao/login')
  @UseGuards(AuthGuard('kakao'))
  async kakaoOauthLogin(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.kakaoLoginExecutes(req.user.kakaoId);
    res.cookie('accessToken', accessToken, { httpOnly: true });
    res.cookie('refreshToken', refreshToken, { httpOnly: true });
    res.cookie('isLoggedIn', true, { httpOnly: false });
    return res.redirect(this.configService.getOrThrow('NEXT_CLIENT_URL'));
  }

  @Post('kakao/callback')
  async kakaoOauthCallback(dto: KakaoOauthCallbackDto) {
    const {} = await this.authService.kakaoOauthCallbackExecute(dto);
  }

  @Post('/kakao/logout')
  async kakaoOauthLogout() {
    return this.authService.kakaoOauthLogout();
  }
}
