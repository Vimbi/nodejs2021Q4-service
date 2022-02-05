import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { errorMsgs } from '../../errors/errors-msgs';
import { checkDataCreation, checkExistence } from '../../validation/checks';
import { Task } from '../tasks/task.entity';
import { Board } from './board.entity';
import { BoardCreateDto } from './dto/board.create.dto';
import { BoardUpdateDto } from './dto/board.update.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardsRepository: Repository<Board>,
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async getAllBoards() {
    const boards = await this.boardsRepository.find();
    // checkExistence(boards, errorMsgs.boardsNotFound);
    return boards;
  }

  async getBoardsByIds(ids) {
    const boards = await this.boardsRepository.findByIds(ids);
    // checkExistence(boards, errorMsgs.boardsNotFound);
    return boards;
  }

  async getBoardById(id: string) {
    return await this.boardsRepository.findOne(id);
  }

  async getBoardByTitle(title: string) {
    return await this.boardsRepository.findOne({ title: title });
  }

  async addBoard(boardDto: BoardCreateDto) {
    const savedBoard = await this.boardsRepository.insert(boardDto);
    checkDataCreation(savedBoard, errorMsgs.boardNotCreated);
    return await this.boardsRepository.findOne(savedBoard.identifiers[0].id);
  }

  async updateBoard(id: string, boardUpdateDto: BoardUpdateDto) {
    await this.boardsRepository.update(id, boardUpdateDto);
    return await this.boardsRepository.findOne(id);
  }

  async deleteBoard(id: string) {
    await this.tasksRepository.delete({ boardId: id });
    await this.boardsRepository.delete(id);
    return;
  }
}
