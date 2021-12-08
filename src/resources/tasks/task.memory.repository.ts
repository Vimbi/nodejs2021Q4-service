import { ITask } from 'src/common/types/task';
import tasks from '../../common/data/tasks';
import Task from './task.model';

const getAll = async () => tasks;

const addTask = async (data: ITask) => {
  const task = new Task(data);
  tasks.push(task);
  return task;
}

const getTaskId = async (id: string) => {
  const result = tasks.find(task => task.id === id);
  return result;
}

const updateTask = async (id: string, data: ITask) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    const updatedTask = { ...tasks[taskIndex], ...data };
    tasks[taskIndex] = updatedTask;
  }
  return '';
}

const deleteTask = async (id: string) => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
}

const deleteBoardTasks = async (id: string) => {
  const boardTasks = await tasks.filter(task => task.boardId === id);
  if (boardTasks.length) boardTasks.forEach(task => deleteTask(task.id));
}

const updateDeleteUserTasks = async (id: string) => {
  const userTasks = await tasks.filter(task => task.userId === id);
  if (userTasks.length) userTasks.forEach(task => updateTask(task.id, { ...task, userId: null }));
}

export { getAll, addTask, getTaskId, updateTask, deleteTask, deleteBoardTasks, updateDeleteUserTasks };
