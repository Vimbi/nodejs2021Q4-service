const boardsService = require('./board.service');
const {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidBoardIdMessage,
  createDeleteBoardIdMessage,
} = require('../../utils/constants');

function boardRoutes(fastify, options, done) {
  fastify.get('/boards', async (req, reply) => {
    const boards = await boardsService.getAll();
    if (boards) {
      reply.code(STATUS_CODES.OK);
      return boards;
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return 'Something went wrong';
  });

  fastify.get('/boards/:boardId', async (req, reply) => {
    const board = await boardsService.getBoard(req.params.boardId);
    if (board) {
      reply.code(STATUS_CODES.OK);
      return board;
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidBoardIdMessage(req.params.boardId);
  });

  fastify.post('/boards', async (req, reply) => {
    const board = await boardsService.addBoard(req.body);
    if (board) {
      reply.code(STATUS_CODES.CREATED);
      return board;
    }
    reply.code(STATUS_CODES.BAD_REQUEST);
    return RESPONSE_MESSAGES.BAD_REQUEST;
  });

  fastify.put('/boards/:boardId', async (req, reply) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    if (board) {
      reply.code(STATUS_CODES.OK);
      return board;
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidBoardIdMessage(req.params.boardId);
  });

  fastify.delete('/boards/:boardId', async (req, reply) => {
    const result = await boardsService.deleteBoard(req.params.boardId);
    if (result) {
      reply.code(STATUS_CODES.OK);
      return createDeleteBoardIdMessage(req.params.boardId);
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidBoardIdMessage(req.params.boardId);
  });

  done();
}

module.exports = boardRoutes;
