const RESPONSE_MESSAGES = {
  BAD_REQUEST: '400 Bad Request',
  NOT_FOUND: '404 Not found',
  INTERNAL_SERVER_ERROR: '500 Internal Server Error',
};

const createInvalidUserIdMessage = (id: string) =>
  `User with id: ${id} does not exist`;
const createDeleteUserIdMessage = (id: string) => `User with id: ${id} deleted`;
const createInvalidBoardIdMessage = (id: string) =>
  `Board with id: ${id} does not exist`;
const createDeleteBoardIdMessage = (id: string) =>
  `Board with id: ${id} deleted`;
const createInvalidTaskIdMessage = (id: string) =>
  `Task with id: ${id} does not exist`;
const createDeleteTaskIdMessage = (id: string) => `Task with id: ${id} deleted`;

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export {
  RESPONSE_MESSAGES,
  STATUS_CODES,
  createInvalidUserIdMessage,
  createDeleteUserIdMessage,
  createInvalidBoardIdMessage,
  createDeleteBoardIdMessage,
  createInvalidTaskIdMessage,
  createDeleteTaskIdMessage,
};
