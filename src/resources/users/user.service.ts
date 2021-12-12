import { IUser } from '../../common/types/user';
import * as usersRepo from './user.memory.repository';
import { updateDeleteUserTasks } from '../tasks/task.service';

const getAll = () => usersRepo.getAll();

const getUser = (id: string) => usersRepo.getUserById(id);

const addUser = (data: IUser) => usersRepo.addUser(data);

const updateUser = (id: string, data: IUser) => usersRepo.updateUser(id, data);

const deleteUser = async (id: string) => {
  await updateDeleteUserTasks(id);
  return usersRepo.deleteUser(id);
};

export { getAll, getUser, addUser, updateUser, deleteUser };
