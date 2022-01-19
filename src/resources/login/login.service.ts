import * as loginRepo from './login.memory.repository';

const getToken = ({ login, password }: { login: string; password: string }) =>
  loginRepo.getToken({ login, password });

export { getToken };
