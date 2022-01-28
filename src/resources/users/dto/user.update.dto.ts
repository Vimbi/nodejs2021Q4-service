import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  login?: string;

  @IsString()
  @IsOptional()
  password?: string;
}
