import { ITask } from 'src/common/types/task';
import * as tasksRepo from './task.memory.repository';

const getAll = () => tasksRepo.getAll();

const addTask = (data: ITask) => tasksRepo.addTask(data);

const getTask = (id: string) => tasksRepo.getTaskId(id);

const updateTask = (id: string, data: ITask) => tasksRepo.updateTask(id, data);

const deleteTask = (id: string) => tasksRepo.deleteTask(id);

const deleteBoardTasks = (id: any) => tasksRepo.deleteBoardTasks(id);

const updateDeleteUserTasks = (id: string) => tasksRepo.updateDeleteUserTasks(id);

export { getAll, addTask, getTask, updateTask, deleteTask, deleteBoardTasks, updateDeleteUserTasks };
