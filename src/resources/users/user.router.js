const User = require('./user.model');
const usersService = require('./user.service');
const {
  STATUS_CODES,
  RESPONSE_MESSAGES,
  createInvalidUserIdMessage,
  createDeleteUserIdMessage,
} = require('../../utils/constants');

function userRoutes(fastify, options, done) {
  fastify.get('/users', async (req, reply) => {
    const users = await usersService.getAll();
    reply.code(STATUS_CODES.OK);
    return users.map(User.toResponse);
  });

  fastify.get('/users/:userId', async (req, reply) => {
    const user = await usersService.getUser(req.params.userId);
    if (user) {
      reply.code(STATUS_CODES.OK);
      return User.toResponse(user);
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidUserIdMessage(req.params.userId);
  });

  fastify.post('/users', async (req, reply) => {
    const user = await usersService.addUser(req.body);
    if (user) {
      reply.code(STATUS_CODES.CREATED);
      return User.toResponse(user);
    }
    reply.code(STATUS_CODES.BAD_REQUEST);
    return RESPONSE_MESSAGES.BAD_REQUEST;
  });

  fastify.put('/users/:userId', async (req, reply) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    if (user) {
      reply.code(STATUS_CODES.OK);
      return User.toResponse(user);
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidUserIdMessage(req.params.userId);
  });

  fastify.delete('/users/:userId', async (req, reply) => {
    const result = await usersService.deleteUser(req.params.userId);
    if (result) {
      reply.code(STATUS_CODES.OK);
      return createDeleteUserIdMessage(req.params.userId);
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidUserIdMessage(req.params.userId);
  });

  done();
}

module.exports = userRoutes;
