import bcrypt from 'bcrypt';
import * as usersRepo from './user.memory.repository';
import { updateDeleteUserTasks } from '../tasks/task.service';
import { User, UserDto } from './user.model';

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

const addUser = async (data: UserDto): Promise<User | undefined> => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const password = await bcrypt.hash(data.password, salt);
  return usersRepo.addUser({ ...data, password });
};

/**
 * Returns the updated user
 * @param id the id of the user we want to update
 * @param data parameters to update
 * @returns updated user or false
 */

const updateUser = (id: string, data: UserDto): Promise<false | User> =>
  usersRepo.updateUser(id, data);

/**
 * Deletes the user and clears the task bindings for this user
 * @param id the id of the user we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteUser = async (id: string): Promise<boolean> => {
  await updateDeleteUserTasks(id);
  return usersRepo.deleteUser(id);
};

export { getAll, getUser, addUser, updateUser, deleteUser };
