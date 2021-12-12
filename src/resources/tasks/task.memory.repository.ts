import { ITask } from '../../common/types/task';
import tasks from '../../common/data/tasks';

const getAll = async () => tasks;

const addTask = async (task: ITask) => {
  tasks.push(task);
  return task;
};

const getTaskId = async (id: string) => {
  const result = tasks.find((task) => task.id === id);
  return result;
};

const updateTask = async (boardId: string, id: string, data: ITask) => {
  const taskIndex = tasks.findIndex(
    (task) => task.id === id && task.boardId === boardId
  );
  if (taskIndex !== -1) {
    const updatedTask = { ...tasks[taskIndex], ...data };
    tasks[taskIndex] = updatedTask;
    return updatedTask;
  }
  return '';
};

const deleteTask = async (id: string) => {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return true;
  }
  return false;
};

const deleteBoardTasks = async (id: string) => {
  await tasks
    .filter((task) => task.boardId === id)
    .forEach((task) => deleteTask(task.id));
  // if (boardTasks.length) boardTasks.forEach(task => deleteTask(task.id));
};

const updateDeleteUserTasks = async (id: string) => {
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
