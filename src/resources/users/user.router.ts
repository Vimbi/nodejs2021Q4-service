import {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidUserIdMessage,
  createDeleteUserIdMessage,
} from '../../utils/constants';
import express from 'express';
import User from './user.model';
import usersService from './user.service';

const router = express.Router();

router.route('/')
  .get(async (_, res) => {
    const users = await usersService.getAll();
    res.status(STATUS_CODES.OK).json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const user = await usersService.addUser(req.body);
    if (user) {
      res.status(STATUS_CODES.CREATED).json(User.toResponse(user));
    } else {
      res.status(STATUS_CODES.BAD_REQUEST).end(RESPONSE_MESSAGES.BAD_REQUEST);
    }
  })

router.route('/:userId')
  .get(async (req, res) => {
    const user = await usersService.getUser(req.params.userId);
    if (user) {
      res.status(STATUS_CODES.OK).json(User.toResponse(user));
    } else {
      res.status(STATUS_CODES.NOT_FOUND).end(createInvalidUserIdMessage(req.params.userId));
    }
  })
  .put(async (req, res) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    if (user) {
      res.status(STATUS_CODES.OK).json(User.toResponse(user));
    } else {
      res.status(STATUS_CODES.NOT_FOUND).end(createInvalidUserIdMessage(req.params.userId));
    }
  })
  .delete(async (req, res) => {
    const result = await usersService.deleteUser(req.params.userId);
    if (result) {
      res.status(STATUS_CODES.OK).end(`User with id: ${req.params.userId} deleted`);
    } else {
      res.status(STATUS_CODES.NOT_FOUND).end(createInvalidUserIdMessage(req.params.userId));
    }
  })

export default router;

