import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { errorMsgs } from '../../errors/errors-msgs';
import { BoardService } from '../../resources/boards/board.service';
import { BoardUpdateDto } from '../../resources/boards/dto/board.update.dto';

@Injectable()
export class UpdateBoardValidationPipe implements PipeTransform {
  constructor(private boardsService: BoardService) {}

  async transform(boardUpdateDto: BoardUpdateDto, _metadata: ArgumentMetadata) {
    if (boardUpdateDto.title) {
      const board = await this.boardsService.getBoardByTitle(
        boardUpdateDto.title,
      );
      if (board) {
        throw new BadRequestException(errorMsgs.boardTitleDuplicated);
      }
    }

    return boardUpdateDto;
  }
}
