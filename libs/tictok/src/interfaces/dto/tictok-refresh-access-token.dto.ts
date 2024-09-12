import { IsNotEmpty, IsString } from 'class-validator';

export class TictokRefreshAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  client_key: string;

  @IsNotEmpty()
  @IsString()
  client_secret: string;

  @IsNotEmpty()
  @IsString()
  grant_type: string;

  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}
