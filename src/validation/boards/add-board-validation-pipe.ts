import {
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorMsgs } from '../../errors/errors-msgs';
import { BoardService } from '../../resources/boards/board.service';
import { BoardCreateDto } from '../../resources/boards/dto/board.create.dto';

@Injectable()
export class AddBoardValidationPipe implements PipeTransform {
  constructor(private boardsService: BoardService) {}

  async transform(boardCreateDto: BoardCreateDto, _metadata: ArgumentMetadata) {
    const board = await this.boardsService.getBoardByTitle(
      boardCreateDto.title,
    );
    if (board) {
      throw new BadRequestException(errorMsgs.boardTitleDuplicated);
    }

    return boardCreateDto;
  }
}
