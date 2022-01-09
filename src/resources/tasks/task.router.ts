import express, { Request } from 'express';
import * as tasksService from './task.service';
import {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidTaskIdMessage,
  createDeleteTaskIdMessage,
} from '../../utils/constants';
import Task from './task.model';

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(async (_, res, next) => {
    try {
      const tasks = await tasksService.getAll();
      return res.status(STATUS_CODES.OK).json(tasks);
    } catch (error) {
      next(error);
    }
  })
  .post(async (req: Request, res, next) => {
    try {
      const task = await tasksService.addTask(
        new Task({ ...req.body, boardId: req.params.boardId })
      );
      if (task) {
        return res.status(STATUS_CODES.CREATED).json(task);
      }
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .end(RESPONSE_MESSAGES.BAD_REQUEST);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.getTask(req.params.taskId);
      if (task) {
        return res.status(STATUS_CODES.OK).json(task);
      }
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidTaskIdMessage(req.params.taskId));
    } catch (error) {
      next(error);
    }
  })
  .put(async (req: Request, res, next) => {
    try {
      const task = await tasksService.updateTask(
        req.params.boardId,
        req.params.taskId,
        req.body
      );
      if (task) {
        return res.status(STATUS_CODES.OK).json(task);
      }
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidTaskIdMessage(req.params.taskId));
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await tasksService.deleteTask(req.params.taskId);
      if (result) {
        return res
          .status(STATUS_CODES.OK)
          .end(createDeleteTaskIdMessage(req.params.taskId));
      }
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidTaskIdMessage(req.params.taskId));
    } catch (error) {
      next(error);
    }
  });

export default router;
