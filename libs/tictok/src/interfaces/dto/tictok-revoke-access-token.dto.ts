import { IsNotEmpty, IsString } from 'class-validator';

export class TictokRevokeAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  client_key: string;

  @IsNotEmpty()
  @IsString()
  client_secret: string;

  @IsNotEmpty()
  @IsString()
  token: string;
}
