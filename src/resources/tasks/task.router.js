const tasksService = require('./task.service');

function taskRouter(fastify, options, done) {
  fastify.get('/boards/:boardId/tasks', async (req, reply) => {
    const tasks = await tasksService.getAll();
    reply.code(200);
    return tasks;
  });

  fastify.get('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const task = await tasksService.getTask(req.params.taskId);
    if (task) {
      reply.code(200);
      return task;
    }
    reply.code(404);
    return `Task with id: ${req.params.taskId} does not exist`;
  });

  fastify.post('/boards/:boardId/tasks', async (req, reply) => {
    const task = await tasksService.addTask(
      Object.assign(req.body, { boardId: req.params.boardId })
    );
    if (task) {
      reply.code(201);
      return task;
    }
    reply.code(404);
    return 'Something went wrong';
  });

  fastify.put('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const task = await tasksService.updateTask(req.params.taskId, req.body);
    if (task) {
      reply.code(200);
      return task;
    }
    reply.code(404);
    return `Task with id: ${req.params.taskId} does not exist`;
  });

  fastify.delete('/boards/:boardId/tasks/:taskId', async (req, reply) => {
    const result = await tasksService.deleteTask(req.params.taskId);
    if (result) {
      reply.code(200);
      return `Task with id: ${req.params.taskId} deleted`;
    }
    reply.code(404);
    return `Task with id: ${req.params.taskId} does not exist`;
  });

  done();
}

module.exports = taskRouter;
