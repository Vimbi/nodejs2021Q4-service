import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { createInvalidUserIdMessage } from '../../errors/errors-msgs';
import { UserService } from '../../resources/users/user.service';
import { checkExistence } from '../checks';

@Injectable()
export class UserExistenceValidationPipe implements PipeTransform {
  constructor(private usersService: UserService) {}

  async transform(id: string, _metadata: ArgumentMetadata) {
    const user = await this.usersService.getUserById(id);
    checkExistence(user, createInvalidUserIdMessage(id));
    return id;
  }
}
