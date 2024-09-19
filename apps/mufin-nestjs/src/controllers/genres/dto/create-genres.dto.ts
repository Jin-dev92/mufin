import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenresDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
