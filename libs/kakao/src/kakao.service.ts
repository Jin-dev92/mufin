import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import {
  GetKakaoAuthorizeDto,
  GetKakaoTokenDto,
} from 'libs/kakao/src/interfaces/dto';
import {
  GetKakaoAuthorizeResponse,
  GetKakaoTokenResponse,
} from '@libs/kakao/interfaces';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class KakaoService {
  private readonly rootUrl = 'https://kauth.kakao.com';

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async login() {
    const { code, client_id, redirect_uri } = await this.getKaKaoAuthorize();

    const body: GetKakaoTokenDto = {
      grant_type: 'authorization_code',
      client_id,
      redirect_uri,
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

  private async getKaKaoAuthorize() {
    // 인가 코드 발급
    try {
      const params: GetKakaoAuthorizeDto = {
        client_id: this.configService.getOrThrow('KAKAO_CLIENT_ID'),
        redirect_uri: this.configService.getOrThrow('KAKAO_REDIRECT_URI'),
        response_type: 'code',
      };
      const { data } = await firstValueFrom(
        this.httpService.get<GetKakaoAuthorizeResponse>(
          `${this.rootUrl}/oauth/authorize`,
          { params },
        ),
      );
      return {
        code: data.code,
        client_id: params.client_id,
        redirect_uri: params.redirect_uri,
      };
    } catch (e) {
      throw e;
    }
  }
}
