import { IsString, MaxLength, MinLength } from 'class-validator';

export class UserDto {
  @IsString()
  name: string;

  @IsString()
  login: string;

  @IsString()
  password: string;
}
