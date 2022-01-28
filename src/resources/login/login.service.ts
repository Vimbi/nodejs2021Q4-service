import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserLoginDto } from '../users/dto/user.login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../users/user.service';
import { errorMsgs } from '../../errors/errors-msgs';

@Injectable()
export class LoginService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}
  async login(userLoginDto: UserLoginDto) {
    const user = await this.usersService.getUserByLogin(userLoginDto.login);
    if (!user) {
      throw new NotFoundException();
      throw new HttpException(
        errorMsgs.wrongLoginPassword,
        HttpStatus.FORBIDDEN,
      );
    }
    const match = await bcrypt.compare(userLoginDto.password, user.password);
    if (!match) {
      throw new HttpException(
        errorMsgs.wrongLoginPassword,
        HttpStatus.FORBIDDEN,
      );
    }
    const payload = { userId: user.id, login: user.login };
    const token = await this.jwtService.sign(payload);
    return { token };
  }
}
