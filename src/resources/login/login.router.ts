import express from 'express';
import * as loginService from './login.service';
import { STATUS_CODES } from '../../utils/constants';

const router = express.Router();

router.route('/').post(async (req, res, next) => {
  try {
    const token = await loginService.getToken(req.body);
    return res.status(STATUS_CODES.OK).json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
