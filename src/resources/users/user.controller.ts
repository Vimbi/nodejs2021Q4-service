import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../guards/auth.guard';
import { AddUserValidationPipe } from '../../validation/users/add-user-validation-pipe';
import { UpdateUserValidationPipe } from '../../validation/users/update-user-validation-pipe';
import { UserExistenceValidationPipe } from '../../validation/users/user-existence-validation-pipe';
import { UserDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { toResponse } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async findUsers() {
    return (await this.userService.getAllUsers()).map(toResponse);
  }

  @Get(':id')
  async getOneUser(@Param('id', UserExistenceValidationPipe) id: string) {
    return toResponse(await this.userService.getUserById(id));
  }

  @Post()
  // async addUser(@Body(AddUserValidationPipe) userDto: UserDto) {
  async addUser(@Body() userDto: UserDto) {
    return toResponse(await this.userService.addUser(userDto));
  }

  @Put(':id')
  async updateUser(
    @Param('id', UserExistenceValidationPipe) id: string,
    // @Body(UpdateUserValidationPipe) userUpdateDto: UserUpdateDto,
    @Body() userUpdateDto: UserUpdateDto,
  ) {
    return toResponse(await this.userService.updateUser(id, userUpdateDto));
  }

  @Delete(':id')
  async deleteUser(@Param('id', UserExistenceValidationPipe) id: string) {
    await this.userService.deleteUser(id);
    return;
  }
}
