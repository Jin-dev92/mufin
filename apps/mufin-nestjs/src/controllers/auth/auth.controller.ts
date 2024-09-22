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
import { LoginDto, SignUpDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { IKaKaoUserRequest } from '../../services/auth/strategies/kakao/interfaces';

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

  @Get('kakao/login')
  @UseGuards(AuthGuard('kakao'))
  // @HttpCode(301)
  async kakaoOauthLogin(@Req() req: IKaKaoUserRequest, @Res() res: Response) {
    // req.user.kakaoId;
  }

  @Post('/kakao/logout')
  async kakaoOauthLogout() {
    return this.authService.kakaoOauthLogout();
  }
}
