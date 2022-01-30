import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorMsgs } from '../../errors/errors-msgs';
import { TaskCreateDto } from '../../resources/tasks/dto/task.create.dto';
import { TaskService } from '../../resources/tasks/task.service';

@Injectable()
export class AddTaskValidationPipe implements PipeTransform {
  constructor(private tasksService: TaskService) {}

  async transform(taskCreateDto: TaskCreateDto, _metadata: ArgumentMetadata) {
    const task = await this.tasksService.getTaskByTitle(
      taskCreateDto.boardId,
      taskCreateDto.title,
    );
    if (task) {
      throw new BadRequestException(errorMsgs.taskTitleDuplicated);
    }

    return taskCreateDto;
  }
}
