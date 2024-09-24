import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TictokService } from '@libs/tictok';
import { EncryptionService } from '@libs/encryption';
import { UserAuthRepository, UserRepository } from '@libs/database';
import { KakaoService } from '@libs/kakao';
import { KakaoOauthCallbackDto, LoginDto, SignUpDto } from '../../controllers';

@Injectable()
export class AuthService {
  constructor(
    private readonly tictokService: TictokService,
    private readonly kakaoService: KakaoService,
    private readonly encryptionService: EncryptionService,
    private readonly userRepository: UserRepository,
    private readonly userAuthRepository: UserAuthRepository,
  ) {}

  async kakaoLoginExecutes(kakaoId: number) {
    if (!kakaoId) {
      return null;
    }
    let user = await this.checkUserWithUserAuthByKakaoId(kakaoId);
    // if(!user){
    //   user = await this.userRepository.create()
    // }
    const accessToken = this.encryptionService.generateAccessToken(user);
    const refreshToken = this.encryptionService.generateRefreshToken(user);

    // await this.userRepository.update({});

    return {
      accessToken,
      refreshToken,
    };
  }

  async kakaoOauthCallbackExecute(dto: KakaoOauthCallbackDto) {
    try {
      const { code } = dto;

      const {
        id_token,
        access_token,
        refresh_token_expires_in,
        refresh_token,
        expires_in,
        token_type,
        scope,
      } = await this.kakaoService.requestAccessToken(code);
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
      const user = await this.checkUserWithUserAuthByEmail(email);
      if (
        !this.encryptionService.validatePassword(
          password,
          user.userAuth.salt,
          user.userAuth.password,
        )
      ) {
        throw new UnauthorizedException('비밀번호가 일치하지 않습니다.');
      }
      this.userAuthRepository.update(user.userAuth.id, {
        // access_token: this.encryptionService.
      });
    } catch (e) {
      throw e;
    }
  }

  async adminLogout() {}

  async adminSignUp(dto: SignUpDto) {}

  private async checkUser(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('해당 유저는 존재하지 않습니다.');
    }
    return user;
  }

  private async checkUserWithUserAuthByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      relations: {
        userAuth: true,
      },
    });
    if (!user) {
      throw new UnauthorizedException('해당 유저는 존재하지 않습니다.');
    }
    return user;
  }

  private async checkUserWithUserAuthByKakaoId(kakaoId: number) {
    const user = await this.userRepository.findOne({
      where: {
        userAuth: {
          kakaoOauth: { kakaoId },
        },
      },
      relations: {
        userAuth: true,
      },
    });
    return user;
  }
}
