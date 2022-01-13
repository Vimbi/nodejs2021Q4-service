import { getRepository } from 'typeorm';
import { Task } from './task.model';

/**
 * Returns an array of all tasks
 * @returns an array of all tasks
 */

const getAll = async (): Promise<Task[]> => {
  const tasks = await getRepository(Task).find();
  return tasks;
};

/**
 * Returns the added task
 * @param data new task parameters
 * @returns added task
 */

const addTask = async (task: Task): Promise<Task | undefined> => {
  const newTask = await getRepository(Task).insert(task);
  return getRepository(Task).findOne(newTask.identifiers[0].id);
};

/**
 * Returns searched task or undefined
 * @param id the task id we are looking for
 * @returns searched task or undefined
 */

const getTaskId = async (id: string): Promise<Task | undefined> => {
  const searchedTask = await getRepository(Task).findOne(id);
  return searchedTask;
};

/**
 * Returns the updated task
 * @param boardId the id of the board to which the task is attached
 * @param id the id of the task we want to update
 * @param data parameters to update
 * @returns updated task or false
 */

const updateTask = async (
  boardId: string,
  id: string,
  data: Task
): Promise<false | Task> => {
  const task = await getRepository(Task).findOne({ boardId, id });
  if (typeof task === 'undefined') {
    return false;
  }
  const updatedTask = await getRepository(Task).update(id, data);
  return updatedTask.raw;
};

/**
 * Deletes the task
 * @param id the id of the task we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteTask = async (id: string): Promise<boolean> => {
  const task = await getRepository(Task).findOne(id);
  if (typeof task === 'undefined') {
    return false;
  }
  await getRepository(Task).delete(id);
  return true;
};

/**
 * Deletes the tasks of the removed board
 * @param id the id of the board we want to delete
 */

const deleteBoardTasks = async (id: string): Promise<void> => {
  await getRepository(Task).delete({ boardId: id });
};

/**
 * Removes the binding of tasks to a remote user
 * @param id the id of the user we want to delete
 */

const updateDeleteUserTasks = async (id: string): Promise<void> => {
  await getRepository(Task).update({ userId: id }, { userId: undefined });
};

export {
  getAll,
  addTask,
  getTaskId,
  updateTask,
  deleteTask,
  deleteBoardTasks,
  updateDeleteUserTasks,
};
