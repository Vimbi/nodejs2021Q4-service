export const errorMsgs = {
  boardNotCreated: 'Board not created',
  boardsNotFound: 'Board(s) not found',
  boardTitleDuplicated: 'Board with the same title already exists',
  taskNotCreated: 'Task not created',
  tasksNotFound: 'Task(s) not found',
  taskTitleDuplicated: 'Task with the same title already exists',
  userLoginDuplicated: 'User with the same login already exists',
  usersNotFound: 'User(s) not found',
  usersNotCreated: 'User not created',
  wrongLoginPassword: 'Wrong login or password',
  wrongTitle: 'Title si too short',
};

export const createInvalidUserIdMessage = (id: string) =>
  `User with id: ${id} not found`;
export const createInvalidBoardIdMessage = (id: string) =>
  `Board with id: ${id} not found`;
export const createInvalidTaskIdMessage = (id: string) =>
  `Task with id: ${id} not found`;
