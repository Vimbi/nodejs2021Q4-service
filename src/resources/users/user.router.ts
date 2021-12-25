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
  .get(async (_, res, next) => {
    try {
      const users = await usersService.getAll();
      return res.status(STATUS_CODES.OK).json(users.map(User.toResponse));
    } catch (error) {
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const user = await usersService.addUser(req.body);
      if (user) {
        return res.status(STATUS_CODES.CREATED).json(User.toResponse(user));
      }
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .end(RESPONSE_MESSAGES.BAD_REQUEST);
    } catch (error) {
      next(error);
    }
  });

router
  .route('/:userId')
  .get(async (req, res, next) => {
    try {
      const user = await usersService.getUser(req.params.userId);
      if (user) res.status(STATUS_CODES.OK).json(User.toResponse(user));
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidUserIdMessage(req.params.userId));
    } catch (error) {
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const user = await usersService.updateUser(req.params.userId, req.body);
      if (user) {
        return res.status(STATUS_CODES.OK).json(User.toResponse(user));
      }
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidUserIdMessage(req.params.userId));
    } catch (error) {
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const result = await usersService.deleteUser(req.params.userId);
      if (result) {
        return res
          .status(STATUS_CODES.OK)
          .end(createDeleteUserIdMessage(req.params.userId));
      }
      return res
        .status(STATUS_CODES.NOT_FOUND)
        .end(createInvalidUserIdMessage(req.params.userId));
    } catch (error) {
      next(error);
    }
  });

export default router;
