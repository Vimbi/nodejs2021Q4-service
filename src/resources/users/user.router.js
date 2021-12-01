const User = require('./user.model');
const usersService = require('./user.service');

// const UserSchema = {
//   type: 'object',
//   properties: {
//     id: { type: 'string' },
//     name: { type: 'string' },
//     login: { type: 'string' },
//   },
// };

// const getUsersOpts = {
//   schema: {
//     response: {
//       200: {
//         type: 'array',
//         items: UserSchema,
//       },
//     },
//   },
//   handler: async (req, reply) => {
//     const users = await usersService.getAll();
//     reply.send(users.map(User.toResponse));
//   },
// };

// const getUserOpts = {
//   schema: {
//     response: {
//       200: UserSchema,
//     },
//   },
// };

// const postUsersOpts = {
//   schema: {
//     response: {
//       201: UserSchema,
//     },
//   },
// };

function userRoutes(fastify, options, done) {
  fastify.get('/users', async (req, reply) => {
    const users = await usersService.getAll();
    reply.code(200)
    return users.map(User.toResponse);
  });

  fastify.get('/users/:userId', async (req, reply) => {
    const user = await usersService.getUser(req.params.userId);
    if (user) {
      reply.code(200);
      return User.toResponse(user);
    }
    reply.code(404);
    return `User with id: ${req.params.userId} does not exist`;
  });

  fastify.post('/users', async (req, reply) => {
    const user = await usersService.addUser(req.body);
    if (user) {
      reply.code(201);
      return User.toResponse(user);
    }
    reply.code(404);
    return 'Something went wrong';
  });

  fastify.put('/users/:userId', async (req, reply) => {
    const user = await usersService.updateUser(req.params.userId, req.body);
    if (user) {
      reply.code(200);
      return User.toResponse(user);
    }
    reply.code(404);
    return `User with id: ${req.params.userId} does not exist`;
  });

  fastify.delete('/users/:userId', async (req, reply) => {
    const result = await usersService.deleteUser(req.params.userId);
    if (result) {
      reply.code(200);
      return `User with id: ${req.params.userId} deleted`;
    }
    reply.code(404);
    return `User with id: ${req.params.userId} does not exist`;
  });

  done();
}

module.exports = userRoutes;
