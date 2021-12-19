import { v4 as uuid } from 'uuid';
import { ITask } from '../../common/types/task';

class Task implements ITask {
  id: string;

  title: string;

  order: number;

  description: string;

  userId: string | null;

  boardId: string;

  columnId: string;

  /**
   * Create a task
   * @param id - task's id
   * @param title - task's title
   * @param description - task's description
   * @param userId - id of the user to whom the task belongs
   * @param boardId - id of the board to which the task belongs
   * @param columnId - id of the column to which the task belongs
   */

  constructor({
    id = uuid(),
    title = 'task_title',
    order = 0,
    description = 'task_description',
    userId = '',
    boardId = '',
    columnId = '',
  } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

export default Task;
