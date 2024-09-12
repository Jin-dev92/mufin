import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  ITictokAuthorizationResponse,
  TictokAuthorizeDto,
} from '@libs/tictok/interfaces';
import { catchError, firstValueFrom } from 'rxjs';

@Injectable()
export class TictokService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async fetchAccessTokenExecute(code: string) {
    try {
      const data: Omit<TictokAuthorizeDto, 'code_verifier'> = {
        client_key: this.configService.getOrThrow('TIKTOK_CLIENT_KEY'),
        client_secret: this.configService.getOrThrow('TIKTOK_CLIENT_SECRET'),
        code,
        grant_type: 'authorization_code',
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
            catchError((error) => {
              throw error;
            }),
          ),
      );

      const {
        access_token,
        refresh_token,
        refresh_expires_in,
        expires_in,
        token_type,
        scope,
      } = response.data;

      return this.configService.getOrThrow('TIKTOK_OAUTH_REDIRECT_URI');
    } catch (e) {
      throw e;
    }
  }
}
