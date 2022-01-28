import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserLoginDto {
  @IsString()
  login: string;

  @IsString()
  password: string;
}
