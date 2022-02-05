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
import { TaskService } from './task.service';
import { TaskExistenceValidationPipe } from '../../validation/tasks/task-existence-validation-pipe';
import { TaskCreateDto } from './dto/task.create.dto';
import { AddTaskValidationPipe } from '../../validation/tasks/add-task-validation-pipe';
import { TaskCreateParam } from '../../utils/custom-decorators/task.create.param';
import { TaskUpdateParam } from '../../utils/custom-decorators/task.update.param';
import { UpdateTaskValidationPipe } from '../../validation/tasks/update-task-validation-pipe';
import { TaskUpdateDto } from './dto/task.update.dto';

@Controller('boards')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get(':boardId/tasks')
  async findTasks(@Param('boardId') boardId: string) {
    return await this.taskService.getAllTasks(boardId);
  }

  @Get(':boardId/tasks/:id')
  async getOneTask(@Param('id', TaskExistenceValidationPipe) id: string) {
    return await this.taskService.getTaskById(id);
  }

  @Post(':boardId/tasks')
  async addTask(
    @TaskCreateParam(AddTaskValidationPipe) taskCreateDto: TaskCreateDto
  ) {
    return await this.taskService.addTask(taskCreateDto);
  }

  @Put(':boardId/tasks/:id')
  async updateTask(
    @TaskUpdateParam(UpdateTaskValidationPipe) taskUpdateDto: TaskUpdateDto
  ) {
    return await this.taskService.updateTask(taskUpdateDto);
  }

  @Delete(':boardId/tasks/:id')
  async deleteBoard(@Param('id', TaskExistenceValidationPipe) id: string) {
    await this.taskService.deleteTask(id);
    return;
  }
}
