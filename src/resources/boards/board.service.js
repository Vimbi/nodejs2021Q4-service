const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const addBoard = (data) => boardsRepo.addBoard(data);

const getBoard = (id) => boardsRepo.getBoardById(id);

const updateBoard = (id, data) => boardsRepo.updateBoard(id, data);

const deleteBoard = async (id) => {
  await tasksService.deleteBoardTasks(id);
  return boardsRepo.deleteBoard(id);
}

module.exports = { getAll, addBoard, getBoard, updateBoard, deleteBoard };
