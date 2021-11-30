const usersRepo = require('./user.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const getUser = (id) => usersRepo.getUserById(id);

const addUser = (data) => usersRepo.addUser(data);

const updateUser = (id, data) => usersRepo.updateUser(id, data);

const deleteUser = async (id) => {
  await tasksService.updateDeleteUserTasks(id);
  return usersRepo.deleteUser(id);
}

module.exports = { getAll, getUser, addUser, updateUser, deleteUser };
