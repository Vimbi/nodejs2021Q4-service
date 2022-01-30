import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMsgs } from '../../errors/errors-msgs';
import { checkDataCreation, checkExistence } from '../../validation/checks';
import { TaskCreateDto } from './dto/task.create.dto';
import { TaskUpdateDto } from './dto/task.update.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getAllTasks(boardId: string) {
    const tasks = await this.tasksRepository.find({ boardId });
    return tasks;
  }

  async getTaskById(id) {
    return await this.tasksRepository.findOne(id);
  }

  async getTaskByTitle(boardId: string, title: string) {
    return await this.tasksRepository.findOne({
      boardId,
      title,
    });
  }

  async addTask(taskCreateDto: TaskCreateDto) {
    const savedTask = await this.tasksRepository.insert(taskCreateDto);
    checkDataCreation(savedTask, errorMsgs.taskNotCreated);
    return await this.tasksRepository.findOne(savedTask.identifiers[0].id);
  }

  async updateTask(taskUpdateDto: TaskUpdateDto) {
    await this.tasksRepository.update(taskUpdateDto.id, taskUpdateDto);
    return await this.tasksRepository.findOne(taskUpdateDto.id);
  }

  async deleteTask(id: string) {
    await this.tasksRepository.delete(id);
    return true;
  }
}
