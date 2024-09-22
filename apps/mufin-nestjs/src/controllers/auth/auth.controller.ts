import { Body, Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../../services';
import { LoginDto, SignUpDto } from './dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard('kakao'))
  async kakaoOauthLogin(@Req() req: Request, @Res() res: Response) {}

  @Post('/kakao/logout')
  async kakaoOauthLogout() {
    return this.authService.kakaoOauthLogout();
  }
}
