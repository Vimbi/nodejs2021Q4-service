import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { AddUserValidationPipe } from '../../validation/users/add-user-validation-pipe';
import { UpdateUserValidationPipe } from '../../validation/users/update-user-validation-pipe';
import { UserExistenceValidationPipe } from '../../validation/users/user-existence-validation-pipe';
import { UserDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findUsers(@Query() query) {
    if (query.id) {
      return await this.userService.getUsersByIds(query.id);
    } else {
      return await this.userService.getAllUsers();
    }
  }

  @Get(':id')
  async getOne(@Param('id', UserExistenceValidationPipe) id: number) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async addUser(@Body(AddUserValidationPipe) userDto: UserDto) {
    return await this.userService.addUser(userDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id', UserExistenceValidationPipe) id: string,
    @Body(UpdateUserValidationPipe) userUpdateDto: UserUpdateDto,
  ) {
    return await this.userService.updateUser(id, userUpdateDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id', UserExistenceValidationPipe) id: string) {
    await this.userService.deleteUser(id);
    return;
  }
}
