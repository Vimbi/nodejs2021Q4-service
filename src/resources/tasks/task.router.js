const tasksService = require('./task.service');
const { STATUS_CODES, RESPONSE_MESSAGES, createInvalidTaskIdMessage, createDeleteTaskIdMessage } = require('../../utils/constants');

function taskRouter(fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', async (req, reply) => {
    const tasks = await tasksService.getAll();
    reply.code(STATUS_CODES.OK);
    return tasks;
  });

  fastify.get('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const task = await tasksService.getTask(req.params.taskId);
    if (task) {
      reply.code(STATUS_CODES.OK);
      return task;
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidTaskIdMessage(req.params.taskId);
  });

  fastify.post('/boards/:boardId/tasks', async (req, reply) => {
    const task = await tasksService.addTask(
      Object.assign(req.body, { boardId: req.params.boardId })
    );
    if (task) {
      reply.code(STATUS_CODES.CREATED);
      return task;
    }
    reply.code(STATUS_CODES.BAD_REQUEST);
    return RESPONSE_MESSAGES.BAD_REQUEST;
  });

  fastify.put('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const task = await tasksService.updateTask(req.params.taskId, req.body);
    if (task) {
      reply.code(STATUS_CODES.OK);
      return task;
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidTaskIdMessage(req.params.taskId);
  });

  fastify.delete('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const result = await tasksService.deleteTask(req.params.taskId);
    if (result) {
      reply.code(STATUS_CODES.OK);
      return createDeleteTaskIdMessage(req.params.taskId);
    }
    reply.code(STATUS_CODES.NOT_FOUND);
    return createInvalidTaskIdMessage(req.params.taskId);
  });

  done();
}

module.exports = taskRouter;
