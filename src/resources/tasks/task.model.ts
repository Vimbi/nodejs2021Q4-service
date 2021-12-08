import { ITask } from 'src/common/types/task';
import { v4 as uuid } from 'uuid';

class Task implements ITask {
  id: string;
  title:string;
  order: number;
  description:string;
  userId: string | null;
  boardId: string;
  columnId: string;

  constructor({
    id = uuid(),
    title = 'task_title',
    order = 0,
    description = "task_description",
    userId = "",
    boardId = "",
    columnId = "",
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
