import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  name?: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsOptional()
  login?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  @IsOptional()
  password?: string;
}
