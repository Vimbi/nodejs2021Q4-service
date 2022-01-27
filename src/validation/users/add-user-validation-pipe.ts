import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorMsgs } from '../../errors/errors-msgs';
import { UserDto } from '../../resources/users/dto/user.create.dto';
import { UserService } from '../../resources/users/user.service';
import { encryptPassword } from '../../utils/encrypt-password';

@Injectable()
export class AddUserValidationPipe implements PipeTransform {
  constructor(private usersService: UserService) {}

  async transform(userDto: UserDto, _metadata: ArgumentMetadata) {
    const user = await this.usersService.getUserByLogin(userDto.login);
    if (user) {
      throw new HttpException(
        errorMsgs.userLoginDuplicated,
        HttpStatus.BAD_REQUEST,
      );
    }
    userDto.password = await encryptPassword(userDto.password);

    return userDto;
  }
}
