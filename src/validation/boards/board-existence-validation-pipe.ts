import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { createInvalidBoardIdMessage } from '../../errors/errors-msgs';
import { BoardService } from '../../resources/boards/board.service';
import { checkExistence } from '../checks';

@Injectable()
export class BoardExistenceValidationPipe implements PipeTransform {
  constructor(private boardService: BoardService) {}

  async transform(id: string, _metadata: ArgumentMetadata) {
    const board = await this.boardService.getBoardById(id);
    checkExistence(board, createInvalidBoardIdMessage(id));
    return id;
  }
}
