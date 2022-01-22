import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../common/config';
import { CustomError } from '../error/error';
import { RESPONSE_MESSAGES, STATUS_CODES } from '../utils/constants';

const authentication = (req: Request, res: Response, next: NextFunction) => {
  const authenticationHeader = req.headers.authorization;
  if (!authenticationHeader) {
    throw new CustomError(
      STATUS_CODES.UNAUTHORIZED,
      RESPONSE_MESSAGES.UNAUTHORIZED
    );
  }
  const token = authenticationHeader.split(' ')[1];
  if (!token) {
    throw new CustomError(
      STATUS_CODES.UNAUTHORIZED,
      RESPONSE_MESSAGES.UNAUTHORIZED
    );
  }
  try {
    jwt.verify(token, JWT_SECRET_KEY as string);
  } catch (error) {
    throw new CustomError(
      STATUS_CODES.UNAUTHORIZED,
      RESPONSE_MESSAGES.UNAUTHORIZED
    );
  }
  next();
};

export { authentication };
