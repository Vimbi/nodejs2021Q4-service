import express from 'express';
import * as boardsService from './board.service';
import taskRouter from '../tasks/task.router';
import {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidBoardIdMessage,
  createDeleteBoardIdMessage,
} from '../../utils/constants';

const router = express.Router();

router
  .route('/')
  .get(async (_, res) => {
    const boards = await boardsService.getAll();
    return res.status(STATUS_CODES.OK).json(boards);
  })
  .post(async (req, res) => {
    const board = await boardsService.addBoard(req.body);
    if (board) {
      res.status(STATUS_CODES.CREATED).json(board);
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).end(RESPONSE_MESSAGES.BAD_REQUEST);
    }
  });

router
  .route('/:boardId')
  .get(async (req, res) => {
    const board = await boardsService.getBoard(req.params.boardId);
    if (board) {
      res.status(STATUS_CODES.OK).json(board);
    } else {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidBoardIdMessage(req.params.boardId));
    }
  })
  .put(async (req, res) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    if (board) {
      res.status(STATUS_CODES.OK).json(board);
    } else {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidBoardIdMessage(req.params.boardId));
    }
  })
  .delete(async (req, res) => {
    const result = await boardsService.deleteBoard(req.params.boardId);
    if (result) {
      res
        .status(STATUS_CODES.OK)
        .end(createDeleteBoardIdMessage(req.params.boardId));
    } else {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidBoardIdMessage(req.params.boardId));
    }
  });

router.use('/:boardId/tasks', taskRouter);

export default router;
