import express from 'express';
import User from './user.model';
import * as usersService from './user.service';
import {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidUserIdMessage,
  createDeleteUserIdMessage,
} from '../../utils/constants';

const router = express.Router();

router
  .route('/')
  .get(async (_, res) => {
    const users = await usersService.getAll();
    return res.status(STATUS_CODES.OK).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.addUser(req.body);
    if (user) {
      return res.status(STATUS_CODES.CREATED).json(User.toResponse(user));
    }
    // TODO сделать везде кастомные ошибки!!!!!!!!!!!!!!!!!!!
    return res
      .status(STATUS_CODES.BAD_REQUEST)
      .end(RESPONSE_MESSAGES.BAD_REQUEST);
  });

router
  .route('/:userId')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.userId);
    if (user) {
      return res.status(STATUS_CODES.OK).json(User.toResponse(user));
    }
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .end(createInvalidUserIdMessage(req.params.userId));
  })
  .put(async (req, res) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    if (user) {
      return res.status(STATUS_CODES.OK).json(User.toResponse(user));
    }
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .end(createInvalidUserIdMessage(req.params.userId));
  })
  .delete(async (req, res) => {
    const result = await usersService.deleteUser(req.params.userId);
    if (result) {
      return res
        .status(STATUS_CODES.OK)
        .end(createDeleteUserIdMessage(req.params.userId));
    }
    return res
      .status(STATUS_CODES.NOT_FOUND)
      .end(createInvalidUserIdMessage(req.params.userId));
  });

export default router;
