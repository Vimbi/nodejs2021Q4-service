import { getRepository } from 'typeorm';
import { User } from './user.model';

/**
 * Returns an array of all users
 * @returns an array of all users
 */

const getAll = async (): Promise<User[]> => {
  const users = await getRepository(User).find();
  return users;
};

/**
 * Returns searched user or undefined
 * @param id the user id we are looking for
 * @returns searched user or undefined
 */

const getUserById = async (id: string): Promise<User | undefined> => {
  const searchedUser = await getRepository(User).findOne(id);
  return searchedUser;
};

/**
 * Returns the added user
 * @param data new user parameters
 * @returns added user
 */

const addUser = async (data: User): Promise<User | undefined> => {
  const user = await getRepository(User).insert(data);
  return getRepository(User).findOne(user.identifiers[0].id);
};

/**
 * Returns the updated user
 * @param id the id of the user we want to update
 * @param data parameters to update
 * @returns updated user or false
 */

const updateUser = async (id: string, data: User): Promise<false | User> => {
  const user = await getRepository(User).findOne(id);
  if (typeof user === 'undefined') {
    return false;
  }
  const updatedUser = await getRepository(User).update(id, data);
  return updatedUser.raw;
};

/**
 * Deletes the user and clears the task bindings for this user
 * @param id the id of the user we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteUser = async (id: string): Promise<boolean> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

export { getAll, getUserById, addUser, updateUser, deleteUser };
