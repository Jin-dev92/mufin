import { IsString } from 'class-validator';

export class KakaoOauthCallbackDto {
  @IsString()
  code: string;
}
