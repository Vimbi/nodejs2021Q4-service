const boardsService = require('./board.service');

function boardRoutes(fastify, options, done) {
  fastify.get('/boards', async (req, reply) => {
    const boards = await boardsService.getAll();
    if (boards) {
      reply.code(200);
      return boards;
    }
    reply.code(404);
    return 'Something went wrong';
  });

  fastify.get('/boards/:boardId', async (req, reply) => {
    const board = await boardsService.getBoard(req.params.boardId);
    if (board) {
      reply.code(200);
      return board;
    }
    reply.code(404);
    return `Board with id: ${req.params.boardId} does not exist`;
  });

  fastify.post('/boards', async (req, reply) => {
    const board = await boardsService.addBoard(req.body);
    if (board) {
      reply.code(201);
      return board;
    }
    reply.code(404);
    return 'Something went wrong';
  });

  fastify.put('/boards/:boardId', async (req, reply) => {
    const board = await boardsService.updateBoard(req.params.boardId, req.body);
    if (board) {
      reply.code(200);
      return board;
    }
    reply.code(404);
    return `Board with id: ${req.params.boardId} does not exist`;
  });

  fastify.delete('/boards/:boardId', async (req, reply) => {
    const result = await boardsService.deleteBoard(req.params.boardId);
    if (result) {
      reply.code(200);
      return `Board with id: ${req.params.boardId} deleted`;
    }
    reply.code(404);
    return `Board with id: ${req.params.boardId} does not exist`;
  });

  done();
}

module.exports = boardRoutes;
