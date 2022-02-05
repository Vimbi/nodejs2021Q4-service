import { IsOptional, IsString } from 'class-validator';

export class BoardUpdateDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsOptional()
  columns?: string;
}
