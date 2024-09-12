import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ITictokAuthorizationResponse,
  TictokFetchAccessTokenDto,
  TictokRefreshAccessTokenDto,
  TictokRevokeAccessTokenDto,
} from '@libs/tictok/interfaces';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class TictokService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchAccessTokenExecute(code: string) {
    try {
      const data: Omit<TictokFetchAccessTokenDto, 'code_verifier'> = {
        client_key: this.configService.getOrThrow('TIKTOK_CLIENT_KEY'),
        client_secret: this.configService.getOrThrow('TIKTOK_CLIENT_SECRET'),
        grant_type: 'authorization_code',
        code,
        redirect_uri: this.configService.getOrThrow(
          'TIKTOK_OAUTH_REDIRECT_URI',
        ),
      };
      const response = await firstValueFrom(
        this.httpService
          .post<ITictokAuthorizationResponse>(
            'https://open.tiktokapis.com/v2/oauth/token/',
            data,
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(error.message, 400);
            }),
          ),
      );

      return response.data;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const data: TictokRefreshAccessTokenDto = {
        client_key: this.configService.getOrThrow('TIKTOK_CLIENT_KEY'),
        client_secret: this.configService.getOrThrow('TIKTOK_CLIENT_SECRET'),
        grant_type: 'authorization_code',
        refresh_token: refreshToken,
      };

      const response = await firstValueFrom(
        this.httpService
          .post<ITictokAuthorizationResponse>(
            'https://open.tiktokapis.com/v2/oauth/token/',
            data,
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            },
          )
          .pipe(
            catchError((error: AxiosError) => {
              throw new HttpException(error.message, 400);
            }),
          ),
      );
      return response.data;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  async revokeAccessToken(token: string) {
    const data: TictokRevokeAccessTokenDto = {
      client_key: this.configService.getOrThrow('TIKTOK_CLIENT_KEY'),
      client_secret: this.configService.getOrThrow('TIKTOK_CLIENT_SECRET'),
      token,
    };
    try {
      this.httpService
        .post('https://open.tiktokapis.com/v2/oauth/revoke/', data, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.message, 400);
          }),
        );
      return true;
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
