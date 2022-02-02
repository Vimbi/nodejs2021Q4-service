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
import { BoardExistenceValidationPipe } from '../../validation/boards/board-existence-validation-pipe';
import { BoardService } from './board.service';
import { BoardCreateDto } from './dto/board.create.dto';
import { AddBoardValidationPipe } from '../../validation/boards/add-board-validation-pipe';
import { BoardUpdateDto } from './dto/board.update.dto';
import { UpdateBoardValidationPipe } from '../../validation/boards/update-board-validation-pipe';

@Controller('boards')
@UseGuards(AuthGuard)
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get()
  async findBoards(@Query() query) {
    if (query.id) {
      return await this.boardService.getBoardsByIds(query.id);
    } else {
      return await this.boardService.getAllBoards();
    }
  }

  @Get(':id')
  async getOneBoard(@Param('id', BoardExistenceValidationPipe) id: string) {
    return await this.boardService.getBoardById(id);
  }

  @Post()
  async addBoard(@Body(AddBoardValidationPipe) boardCreateDto: BoardCreateDto) {
    return await this.boardService.addBoard(boardCreateDto);
  }

  @Put(':id')
  async updateBoard(
    @Param('id', BoardExistenceValidationPipe) id: string,
    @Body(UpdateBoardValidationPipe) boardUpdateDto: BoardUpdateDto,
  ) {
    return await this.boardService.updateBoard(id, boardUpdateDto);
  }

  @Delete(':id')
  async deleteBoard(@Param('id', BoardExistenceValidationPipe) id: string) {
    await this.boardService.deleteBoard(id);
    return;
  }
}
