const users = require('../../common/data/users');
const User = require('./user.model');

const getAll = async () => users;

const getUserById = async (id) => {
  const searchedUser = users.find((user) => user.id === id);
  return searchedUser;
};

const addUser = async (data) => {
  const user = new User(data);
  users.push(user);
  return user;
};

const updateUser = async (id, data) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const updatedUser = { ...users[userIndex], ...data };
    users[userIndex] = updatedUser;
    return updatedUser;
  }
  return '';
};

const deleteUser = async (id) => {
  const userIndex = users.findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
};

module.exports = { getAll, getUserById, addUser, updateUser, deleteUser };
