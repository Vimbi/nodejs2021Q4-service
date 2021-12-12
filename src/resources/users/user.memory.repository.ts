import { IUser } from '../../common/types/user';
import users from '../../common/data/users';
import User from './user.model';

const getAll = async () => users;

const getUserById = async (id: string) => {
  const searchedUser = users.find((user) => user.id === id);
  return searchedUser;
};

const addUser = async (data: IUser) => {
  const user = new User(data);
  users.push(user);
  return user;
};

const updateUser = async (id: string, data: IUser) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...data };
    users[userIndex] = updatedUser;
    return updatedUser;
  }
  return '';
};

const deleteUser = async (id: string) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

export { getAll, getUserById, addUser, updateUser, deleteUser };
