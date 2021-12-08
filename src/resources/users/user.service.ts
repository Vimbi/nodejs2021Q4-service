import * as usersRepo from './user.memory.repository';
import * as tasksService from '../tasks/task.service';
import { IUser } from 'src/common/types/user';

const getAll = () => usersRepo.getAll();

const getUser = (id: string) => usersRepo.getUserById(id);

const addUser = (data: IUser) => usersRepo.addUser(data);

const updateUser = (id: string, data: IUser) => usersRepo.updateUser(id, data);

const deleteUser = async (id: string) => {
  await tasksService.updateDeleteUserTasks(id);
  return usersRepo.deleteUser(id);
}

export { getAll, getUser, addUser, updateUser, deleteUser };
