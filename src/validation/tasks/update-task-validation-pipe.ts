import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import {
  createInvalidTaskIdMessage,
  errorMsgs,
} from '../../errors/errors-msgs';
import { TaskUpdateDto } from '../../resources/tasks/dto/task.update.dto';
import { TaskService } from '../../resources/tasks/task.service';
import { checkExistence } from '../checks';

@Injectable()
export class UpdateTaskValidationPipe implements PipeTransform {
  constructor(private tasksService: TaskService) {}

  async transform(taskUpdateDto: TaskUpdateDto, _metadata: ArgumentMetadata) {
    const excistingTask = await this.tasksService.getTaskById(taskUpdateDto.id);
    checkExistence(excistingTask, createInvalidTaskIdMessage(taskUpdateDto.id));

    // const task = await this.tasksService.getTaskByTitle(
    //   taskUpdateDto.boardId,
    //   taskUpdateDto.title,
    // );
    // if (task) {
    //   throw new BadRequestException(errorMsgs.taskTitleDuplicated);
    // }

    if (taskUpdateDto.title && taskUpdateDto.title.length < 1) {
      throw new BadRequestException(errorMsgs.wrongTitle);
    }

    return taskUpdateDto;
  }
}
