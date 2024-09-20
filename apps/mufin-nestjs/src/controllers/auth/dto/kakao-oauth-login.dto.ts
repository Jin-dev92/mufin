import { IsIP, IsString } from 'class-validator';

export class KakaoOauthLoginDto {
  @IsString()
  useragent: string;
  @IsIP()
  ip: string;
  @IsString()
  code: string;
}
