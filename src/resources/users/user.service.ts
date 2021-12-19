import { IUser } from '../../common/types/user';
import * as usersRepo from './user.memory.repository';
import { updateDeleteUserTasks } from '../tasks/task.service';

/**
 * Returns an array of all users
 * @returns an array of all users
 */

const getAll = () => usersRepo.getAll();

/**
 * Returns searched user or undefined
 * @param id the user id we are looking for
 * @returns searched user or undefined
 */

const getUser = (id: string) => usersRepo.getUserById(id);

/**
 * Returns the added user
 * @param data new user parameters
 * @returns added user
 */

const addUser = (data: IUser) => usersRepo.addUser(data);

/**
 * Returns the updated user
 * @param id the id of the user we want to update
 * @param data parameters to update
 * @returns updated user or empty string
 */

const updateUser = (id: string, data: IUser) => usersRepo.updateUser(id, data);

/**
 * Deletes the user and clears the task bindings for this user
 * @param id the id of the user we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteUser = async (id: string) => {
  await updateDeleteUserTasks(id);
  return usersRepo.deleteUser(id);
};

export { getAll, getUser, addUser, updateUser, deleteUser };
