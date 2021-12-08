import express, { Request } from 'express';
import * as tasksService from './task.service';
import {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidTaskIdMessage,
  createDeleteTaskIdMessage,
} from '../../utils/constants';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(async (_, res) => {
    const tasks = await tasksService.getAll();
    res.status(STATUS_CODES.OK).json(tasks);
  })
  .post(async (req: Request, res) => {
    const task = await tasksService
      .addTask(Object.assign(req.body, { boardId: req.params.boardId }));
    if (task) {
      res.status(STATUS_CODES.CREATED).json(task);
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).end(RESPONSE_MESSAGES.BAD_REQUEST);
    }
  })

router.route('/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTask(req.params.taskId);
    if (task) {
      res.status(STATUS_CODES.OK).json(task);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).end(createInvalidTaskIdMessage(req.params.taskId));
    }
  })
  .put(async (req, res) => {
    const task = await tasksService.updateTask(req.params.taskId, req.body);
    if (task) {
      res.status(STATUS_CODES.OK).json(task);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).end(createInvalidTaskIdMessage(req.params.taskId));
    }
  })
  .delete(async (req, res) => {
    const result = await tasksService.deleteTask(req.params.taskId);
    if (result) {
      res.status(STATUS_CODES.OK).end(createDeleteTaskIdMessage(req.params.taskId));
    } else {
      res.status(STATUS_CODES.NOT_FOUND).end(createInvalidTaskIdMessage(req.params.taskId));
    }
  })

export default router;
