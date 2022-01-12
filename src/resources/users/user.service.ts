import * as usersRepo from './user.memory.repository';
import { updateDeleteUserTasks } from '../tasks/task.service';
import { User } from './user.model';

/**
 * Returns an array of all users
 * @returns an array of all users
 */

const getAll = (): Promise<User[]> => usersRepo.getAll();

/**
 * Returns searched user or undefined
 * @param id the user id we are looking for
 * @returns searched user or undefined
 */

const getUser = (id: string): Promise<User | undefined> =>
  usersRepo.getUserById(id);

/**
 * Returns the added user
 * @param data new user parameters
 * @returns added user
 */

const addUser = (data: User): Promise<User | undefined> =>
  usersRepo.addUser(data);

/**
 * Returns the updated user
 * @param id the id of the user we want to update
 * @param data parameters to update
 * @returns updated user or false
 */

const updateUser = (id: string, data: User): Promise<false | User> =>
  usersRepo.updateUser(id, data);

/**
 * Deletes the user and clears the task bindings for this user
 * @param id the id of the user we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteUser = async (id: string): Promise<boolean> => {
  // TODO delete TASKS
  await updateDeleteUserTasks(id);
  return usersRepo.deleteUser(id);
};

export { getAll, getUser, addUser, updateUser, deleteUser };
