const boardsService = require('./board.service');

function boardRoutes(fastify, options, done) {
  fastify
    .get('/boards', async (req, reply) => {
      const boards = await boardsService.getAll();
      if (boards) {
        reply.code(200).type('application/json').send(boards);
      } else {
        reply.code(404).type('application/json').send('Something went wrong');
      }
    })
    .get('/boards/:boardId', async (req, reply) => {
      const board = await boardsService.getBoard(req.params.boardId);
      if (board) {
        reply.code(200).type('application/json').send(board);
      } else {
        reply
          .code(404)
          .type('application/json')
          .send(`Board with id: ${req.params.boardId} does not exist`);
      }
    })
    .post('/boards', async (req, reply) => {
      const board = await boardsService.addBoard(req.body);
      if (board) {
        reply.code(201).type('application/json').send(board);
      } else {
        reply.code(404).type('application/json').send('Something went wrong');
      }
    })
    .put('/boards/:boardId', async (req, reply) => {
      const board = await boardsService.updateBoard(
        req.params.boardId,
        req.body
      );
      if (board) {
        reply.code(200).type('application/json').send(board);
      } else {
        reply
          .code(404)
          .type('application/json')
          .send(`Board with id: ${req.params.boardId} does not exist`);
      }
    })
    .delete('/boards/:boardId', async (req, reply) => {
      const result = await boardsService.deleteBoard(req.params.boardId);
      if (result) {
        reply
          .code(200)
          .type('application/json')
          .send(`Board with id: ${req.params.boardId} deleted`);
      } else {
        reply
          .code(404)
          .type('application/json')
          .send(`Board with id: ${req.params.boardId} does not exist`);
      }
    });

  done();
}

module.exports = boardRoutes;
