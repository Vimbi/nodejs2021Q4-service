const RESPONSE_MESSAGES = {
  BAD_REQUEST: '400 Bad Request',
  NOT_FOUND: '404 Not found',
  INTERNAL_SERVER_ERROR: '500 Internal Server Error',
};

const createInvalidUserIdMessage = (id) => `User with id: ${id} does not exist`;
const createDeleteUserIdMessage = (id) => `User with id: ${id} deleted`;
const createInvalidBoardIdMessage = (id) =>
  `Board with id: ${id} does not exist`;
const createDeleteBoardIdMessage = (id) => `Board with id: ${id} deleted`;
const createInvalidTaskIdMessage = (id) => `Task with id: ${id} does not exist`;
const createDeleteTaskIdMessage = (id) => `Task with id: ${id} deleted`;

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
  RESPONSE_MESSAGES,
  STATUS_CODES,
  createInvalidUserIdMessage,
  createDeleteUserIdMessage,
  createInvalidBoardIdMessage,
  createDeleteBoardIdMessage,
  createInvalidTaskIdMessage,
  createDeleteTaskIdMessage,
};
