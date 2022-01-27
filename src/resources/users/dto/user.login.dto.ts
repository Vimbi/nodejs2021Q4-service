import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  login: string;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  password: string;
}
