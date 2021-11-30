const tasksService = require('./task.service');

function taskRouter(fastify, options, done) {
  fastify
    .get('/boards/:boardId/tasks', async (req, reply) => {
      const tasks = await tasksService.getAll();
      reply.code(200).type('application/json').send(tasks);
    })
    .get('/boards/:boardId/tasks/:taskId', async (req, reply) => {
      const task = await tasksService.getTask(req.params.taskId);
      if (task) {
        reply.code(200).type('application/json').send(task);
      } else {
        reply
          .code(404)
          .type('application/json')
          .send(`Task with id: ${req.params.taskId} does not exist`);
      }
    })
    .post('/boards/:boardId/tasks', async (req, reply) => {
      const task = await tasksService.addTask(
        Object.assign(req.body, { boardId: req.params.boardId })
      );
      if (task) {
        reply.code(201).type('application/json').send(task);
      } else {
        reply.code(404).type('application/json').send('Something went wrong');
      }
    })
    .put('/boards/:boardId/tasks/:taskId', async (req, reply) => {
      const task = await tasksService.updateTask(req.params.taskId, req.body);
      if (task) {
        reply.code(200).type('application/json').send(task);
      } else {
        reply.code(404).type('application/json').send(`Task with id: ${req.params.taskId} does not exist`);
      }
    })
    .delete('/boards/:boardId/tasks/:taskId', async (req, reply) => {
      const result = await tasksService.deleteTask(req.params.taskId);
      if (result) {
        reply.code(200).type('application/json').send(`Task with id: ${req.params.taskId} deleted`);
      } else {
        reply.code(404).type('application/json').send(`Task with id: ${req.params.taskId} does not exist`);
      }
    })

  done();
}

module.exports = taskRouter;
