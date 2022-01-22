import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../common/config';
import { CustomError } from '../../error/error';
import { RESPONSE_MESSAGES, STATUS_CODES } from '../../utils/constants';
import * as usersRepo from '../users/user.memory.repository';

const getToken = async ({
  login,
  password,
}: {
  login: string;
  password: string;
}) => {
  const user = await usersRepo.getUserByLogin(login);
  if (!user)
    throw new CustomError(STATUS_CODES.FORBIDDEN, RESPONSE_MESSAGES.FORBIDDEN);

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    throw new CustomError(STATUS_CODES.FORBIDDEN, RESPONSE_MESSAGES.FORBIDDEN);
  const payload = { userId: user.id, login: user.login };
  const token = jwt.sign(payload, JWT_SECRET_KEY as string, {
    expiresIn: '7D',
  });
  return token;
};

export { getToken };
