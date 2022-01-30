import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { createInvalidTaskIdMessage } from '../../errors/errors-msgs';
import { TaskService } from '../../resources/tasks/task.service';
import { checkExistence } from '../checks';

@Injectable()
export class TaskExistenceValidationPipe implements PipeTransform {
  constructor(private tasksService: TaskService) {}

  async transform(id: string, _metadata: ArgumentMetadata) {
    const task = await this.tasksService.getTaskById(id);
    checkExistence(task, createInvalidTaskIdMessage(id));
    return id;
  }
}
