import { ITask } from '../../common/types/task';
import tasks from '../../common/data/tasks';

/**
 * Returns an array of all tasks
 * @returns an array of all tasks
 */

const getAll = async (): Promise<ITask[]> => tasks;

/**
 * Returns the added task
 * @param data new task parameters
 * @returns added task
 */

const addTask = async (task: ITask): Promise<ITask> => {
  tasks.push(task);
  return task;
};

/**
 * Returns searched task or undefined
 * @param id the task id we are looking for
 * @returns searched task or undefined
 */

const getTaskId = async (id: string): Promise<ITask | undefined> => {
  const result = tasks.find((task) => task.id === id);
  return result;
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
  data: ITask
): Promise<false | ITask> => {
  const taskIndex = tasks.findIndex(
    (task) => task.id === id && task.boardId === boardId
  );
  if (taskIndex !== -1) {
    const updatedTask: ITask = { ...tasks[taskIndex], ...data };
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  }
  return false;
};

/**
 * Deletes the task
 * @param id the id of the task we want to delete
 * @returns a boolean confirmation or denial of deletion
 */

const deleteTask = async (id: string): Promise<boolean> => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};

/**
 * Deletes the tasks of the removed board
 * @param id the id of the board we want to delete
 */

const deleteBoardTasks = async (id: string): Promise<void> => {
  await tasks
    .filter((task) => task.boardId === id)
    .forEach((task) => deleteTask(task.id));
};

/**
 * Removes the binding of tasks to a remote user
 * @param id the id of the user we want to delete
 */

const updateDeleteUserTasks = async (id: string): Promise<void> => {
  tasks.forEach((task, index) => {
    if (task.userId === id) {
      tasks[index] = { ...task, userId: null };
    }
  });
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
