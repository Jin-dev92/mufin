import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { GetKakaoTokenDto } from 'libs/kakao/src/interfaces/dto';
import { GetKakaoTokenResponse } from '@libs/kakao/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  private readonly rootUrl = 'https://kauth.kakao.com';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async requestAccessToken(code: string) {
    const body: GetKakaoTokenDto = {
      grant_type: 'authorization_code',
      client_id: this.configService.getOrThrow('KAKAO_CLIENT_ID'),
      redirect_uri:
        this.configService.getOrThrow('NEXT_CLIENT_URL') +
        '/auth/callback/kakao',
      code,
    };

    try {
      const { data } = await firstValueFrom(
        this.httpService.post<GetKakaoTokenResponse>(
          `${this.rootUrl}/oauth/token`,
          body,
        ),
      );
      return data;
    } catch (e) {
      throw e;
    }
  }

  async logout() {}

  async refreshToken() {}
  async getUserInfo(accessToken: string) {
    try {
    } catch (e) {
      throw new UnauthorizedException('카카오 유저 정보 로드 실패');
    }
  }
  // private async getKaKaoAuthorize() {
  //   // 인가 코드 발급
  //   try {
  //     const params: GetKakaoAuthorizeDto = {
  //       client_id: this.configService.getOrThrow('KAKAO_CLIENT_ID'),
  //       redirect_uri:
  //         this.configService.getOrThrow('NEXT_CLIENT_URL') +
  //         '/auth/callback/kakao',
  //       response_type: 'code',
  //       scope: [
  //         'profile_nickname',
  //         'profile_image',
  //         'account_email',
  //         'name',
  //         'birthday',
  //         'birthyear',
  //         'phone_number',
  //         // 'openid',
  //       ].join(' '),
  //     };
  //
  //     const { data } = await firstValueFrom(
  //       this.httpService.get<GetKakaoAuthorizeResponse>(
  //         `${this.rootUrl}/oauth/authorize`,
  //         { params },
  //       ),
  //     );
  //
  //     console.log('getKaKaoAuthorize', data);
  //     return {
  //       code: data.code,
  //       client_id: params.client_id,
  //       redirect_uri: params.redirect_uri,
  //     };
  //   } catch (e) {
  //     throw e;
  //   }
  // }
}
