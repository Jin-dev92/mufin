import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../services';
import { KakaoOauthLoginDto, LoginDto, SignUpDto } from './dto';

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
  async kakaoOauthLogin(@Body() dto: KakaoOauthLoginDto) {
    return this.authService.kakaoOauthLogin(dto);
  }
  @Post('/kakao/logout')
  async kakaoOauthLogout() {
    return this.authService.kakaoOauthLogout();
  }
}
