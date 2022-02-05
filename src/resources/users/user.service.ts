import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMsgs } from '../../errors/errors-msgs';
import { checkDataCreation, checkExistence } from '../../validation/checks';
import { Task } from '../tasks/task.entity';
import { UserDto } from './dto/user.create.dto';
import { UserUpdateDto } from './dto/user.update.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find();
    // checkExistence(users, errorMsgs.usersNotFound);
    return users;
  }

  async getUserById(id: string) {
    return await this.usersRepository.findOne(id);
  }

  async getUserByLogin(login: string) {
    const user = await this.usersRepository
      .createQueryBuilder('users')
      .where('users.login = :login', { login: login })
      .getOne();
    return user;
  }

  async addUser(userDto: UserDto) {
    const savedUser = await this.usersRepository.insert(userDto);
    checkDataCreation(savedUser, errorMsgs.usersNotCreated);
    return await this.usersRepository.findOne(savedUser.identifiers[0].id);
  }

  async updateUser(id: string, userUpdateDto: UserUpdateDto) {
    await this.usersRepository.update(id, userUpdateDto);
    return await this.usersRepository.findOne(id);
  }

  async deleteUser(id: string) {
    await this.tasksRepository.update({ userId: id }, { userId: undefined });
    await this.usersRepository.delete(id);
    return;
  }
}
