import { ITask } from '../../common/types/task';
import * as tasksRepo from './task.memory.repository';

/**
 * Returns an array of all tasks
 * @returns an array of all tasks
 */

const getAll = (): Promise<ITask[]> => tasksRepo.getAll();

/**
 * Returns searched task or undefined
 * @param id the task id we are looking for
 * @returns searched task or undefined
 */

const getTask = (id: string): Promise<ITask | undefined> =>
  tasksRepo.getTaskId(id);

/**
 * Returns the added task
 * @param data new task parameters
 * @returns added task
 */

const addTask = (task: ITask): Promise<ITask> => tasksRepo.addTask(task);

/**
 * Returns the updated task
 * @param boardId the id of the board to which the task is attached
 * @param id the id of the task we want to update
 * @param data parameters to update
 * @returns updated task or false
 */

const updateTask = (
  boardId: string,
  id: string,
  data: ITask
): Promise<false | ITask> => tasksRepo.updateTask(boardId, id, data);

/**
 * Deletes the task
 * @param id the id of the task we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteTask = (id: string): Promise<boolean> => tasksRepo.deleteTask(id);

/**
 * Deletes the tasks of the removed board
 * @param id the id of the board we want to delete
 */

const deleteBoardTasks = (id: string): Promise<void> =>
  tasksRepo.deleteBoardTasks(id);

/**
 * Removes the binding of tasks to a remote user
 * @param id the id of the user we want to delete
 */

const updateDeleteUserTasks = (id: string): Promise<void> =>
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
