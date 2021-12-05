const tasks = require('../../common/data/tasks');
const Task = require('./task.model');

const getAll = async () => tasks;

const getTaskById = async (id) => {
  const searchedTask = tasks.find((task) => task.id === id);
  return searchedTask;
};

const addTask = async (data) => {
  const task = new Task(data);
  tasks.push(task);
  return task;
};

const updateTask = async (id, data) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    const updatedTask = { ...tasks[taskIndex], ...data };
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  }
  return '';
};

const deleteTask = async (id) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};

const deleteBoardTasks = async (id) => {
  const boardTasks = await tasks.filter((task) => task.boardId === id);
  if (boardTasks.length) boardTasks.forEach((task) => deleteTask(task.id));
};

const updateDeleteUserTasks = async (id) => {
  const userTasks = await tasks.filter((task) => task.userId === id);
  if (userTasks.length)
    userTasks.forEach((task) => updateTask(task.id, { userId: null }));
};

module.exports = {
  getAll,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  updateDeleteUserTasks,
};
