import { IUser } from '../../common/types/user';
import users from '../../common/data/users';
import User from './user.model';

/**
 * Returns an array of all users
 * @returns an array of all users
 */

const getAll = async (): Promise<IUser[]> => users;

/**
 * Returns searched user or undefined
 * @param id the user id we are looking for
 * @returns searched user or undefined
 */

const getUserById = async (id: string): Promise<IUser | undefined> => {
  const searchedUser = users.find((user) => user.id === id);
  return searchedUser;
};

/**
 * Returns the added user
 * @param data new user parameters
 * @returns added user
 */

const addUser = async (data: IUser): Promise<User> => {
  const user = new User(data);
  users.push(user);
  return user;
};

/**
 * Returns the updated user
 * @param id the id of the user we want to update
 * @param data parameters to update
 * @returns updated user or false
 */

const updateUser = async (id: string, data: IUser): Promise<false | IUser> => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const updatedUser: IUser = { ...users[userIndex], ...data };
    users[userIndex] = updatedUser;
    return updatedUser;
  }
  return false;
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
