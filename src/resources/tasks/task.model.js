const uuid = require('uuid').v4;

class Task {
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

module.exports = Task;
