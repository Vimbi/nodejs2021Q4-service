import { ITask } from '../../common/types/task';
import * as tasksRepo from './task.memory.repository';

const getAll = () => tasksRepo.getAll();

const addTask = (task: ITask) => tasksRepo.addTask(task);

const getTask = (id: string) => tasksRepo.getTaskId(id);

const updateTask = (boardId: string, id: string, data: ITask) =>
  tasksRepo.updateTask(boardId, id, data);

const deleteTask = (id: string) => tasksRepo.deleteTask(id);

const deleteBoardTasks = (id: string) => tasksRepo.deleteBoardTasks(id);

const updateDeleteUserTasks = (id: string) =>
  tasksRepo.updateDeleteUserTasks(id);

export {
  getAll,
  addTask,
  getTask,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  updateDeleteUserTasks,
};
