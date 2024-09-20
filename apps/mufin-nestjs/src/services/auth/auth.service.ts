import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TictokService } from '@libs/tictok';
import {
  KakaoOauthLoginDto,
  LoginDto,
  SignUpDto,
} from '../../controllers/auth/dto';
import { EncryptionService } from '@libs/encryption';
import { UserAuthRepository, UserRepository } from '@libs/database';
import { KakaoService } from '@libs/kakao';

@Injectable()
export class AuthService {
  constructor(
    private readonly tictokService: TictokService,
    private readonly kakaoService: KakaoService,
    private readonly encryptionService: EncryptionService,
    private readonly userRepository: UserRepository,
    private readonly userAuthRepository: UserAuthRepository,
  ) {}

  async tictokAuthorizeExecute() {}

  async kakaoOauthLogin(
    dto: KakaoOauthLoginDto,
    ip: string,
    useragent: string,
  ) {
    try {
      const {
        id_token,
        access_token,
        refresh_token_expires_in,
        refresh_token,
        expires_in,
        token_type,
        scope,
      } = await this.kakaoService.requestAccessToken(dto.code);
      /* 유저 체크 후, 가입된 이력이 없다면 새로 만들어줌. */

      return {
        // id_token,
        access_token,
        refresh_token_expires_in,
        refresh_token,
        expires_in,
        token_type,
        // scope,
      };
    } catch (e) {
      throw new UnauthorizedException('카카오 로그인에 실패했습니다.');
    }
  }

  kakaoOauthLogout() {
    this.kakaoService.logout();
  }

  async adminLogin(dto: LoginDto) {
    // 이후 어드민 서버 및 클라이언트 분리 필요
    const { email, password } = dto;
    try {
      const user = await this.checkUser(email);
      if (
        !this.encryptionService.validatePassword(
          password,
          user.auth.salt,
          user.auth.password,
        )
      ) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }
      this.userAuthRepository.update(user.auth.id, {
        // access_token: this.encryptionService.
      });
    } catch (e) {
      throw e;
    }
  }

  async logout() {}

  async signUp(dto: SignUpDto) {}

  async signUpByKakao() {}

  async checkUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        auth: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('해당 유저는 존재하지 않습니다.');
    }
    return user;
  }
}
