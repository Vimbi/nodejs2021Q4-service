import { Body, Controller, Post } from '@nestjs/common';
import { UserLoginDto } from '../users/dto/user.login.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private loginService: LoginService) {}

  @Post()
  async login(@Body() userLoginDto: UserLoginDto) {
    return await this.loginService.login(userLoginDto);
  }
}
