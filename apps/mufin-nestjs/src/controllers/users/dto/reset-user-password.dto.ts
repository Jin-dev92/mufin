import { IsString } from 'class-validator';

export class ResetUserPasswordDto {
  @IsString()
  password: string;
}
