import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class TictokFetchAccessTokenDto {
  @IsNotEmpty()
  @IsString()
  client_key: string;

  @IsNotEmpty()
  @IsString()
  client_secret: string;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  grant_type: string;

  @IsNotEmpty()
  @IsUrl()
  redirect_uri: string;

  @IsOptional()
  @IsString()
  code_verifier: string;
}
