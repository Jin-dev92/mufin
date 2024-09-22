import { IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class PageCountDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  skip: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  take: number;
}
