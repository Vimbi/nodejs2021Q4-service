const RESPONSE_MESSAGES = {
  BAD_REQUEST: '400 Bad Request',
  UNAUTHORIZED: '401 Unauthorized',
  FORBIDDEN: '403 Forbidden',
  NOT_FOUND: '404 Not found',
  INTERNAL_SERVER_ERROR: '500 Internal Server Error',
};

const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

/**
 * Returns a string message stating that the user with the given id does not exist
 * @param id the user id
 * @returns a string message stating that the user with the given id does not exist
 */

const createInvalidUserIdMessage = (id: string) =>
  `User with id: ${id} does not exist`;

/**
 * Returns a string message stating that the user with the given id has been deleted
 * @param id the user id
 * @returns a string message stating that the user with the given id has been deleted
 */

const createDeleteUserIdMessage = (id: string) => `User with id: ${id} deleted`;

/**
 * Returns a string message stating that the board with the given id does not exist
 * @param id the board id
 * @returns a string message stating that the board with the given id does not exist
 */

const createInvalidBoardIdMessage = (id: string) =>
  `Board with id: ${id} does not exist`;

/**
 * Returns a string message stating that the board with the given id has been deleted
 * @param id the board id
 * @returns a string message stating that the board with the given id has been deleted
 */

const createDeleteBoardIdMessage = (id: string) =>
  `Board with id: ${id} deleted`;

/**
 * Returns a string message stating that the task with the given id does not exist
 * @param id the task id
 * @returns a string message stating that the task with the given id does not exist
 */

const createInvalidTaskIdMessage = (id: string) =>
  `Task with id: ${id} does not exist`;

/**
 * Returns a string message stating that the task with the given id has been deleted
 * @param id the task id
 * @returns a string message stating that the task with the given id has been deleted
 */

const createDeleteTaskIdMessage = (id: string) => `Task with id: ${id} deleted`;

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
