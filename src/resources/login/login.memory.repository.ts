import bcrypt from 'bcrypt';
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

  // TODO need SALT
  const check = await bcrypt.compare(password, user.password);
  if (!check)
    throw new CustomError(STATUS_CODES.FORBIDDEN, RESPONSE_MESSAGES.FORBIDDEN);

};

export { getToken };
