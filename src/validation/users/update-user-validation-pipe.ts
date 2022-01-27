import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorMsgs } from '../../errors/errors-msgs';
import { UserDto } from '../../resources/users/dto/user.create.dto';
import { UserUpdateDto } from '../../resources/users/dto/user.update.dto';
import { UserService } from '../../resources/users/user.service';
import { encryptPassword } from '../../utils/encrypt-password';

@Injectable()
export class UpdateUserValidationPipe implements PipeTransform {
  constructor(private usersService: UserService) {}

  async transform(userUpdateDto: UserUpdateDto, _metadata: ArgumentMetadata) {
    if (userUpdateDto.login) {
      const user = await this.usersService.getUserByLogin(userUpdateDto.login);
      if (user) {
        throw new HttpException(
          errorMsgs.userLoginDuplicated,
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    if (userUpdateDto.password) {
      userUpdateDto.password = await encryptPassword(userUpdateDto.password);
    }

    return userUpdateDto;
  }
}
